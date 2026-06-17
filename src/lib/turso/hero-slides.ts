import type { HeroSlide, HeroSlideRecord } from "@/types/hero-slide";
import { getTursoClient } from "./client";
import { initTursoHeroSlides } from "./init";

export type HeroSlideCreateInput = {
  alt: string;
  imageUrl: string;
  imageKey: string;
  sortOrder?: number;
};

export type HeroSlideUpdateInput = Partial<HeroSlideCreateInput>;

function parseNumber(value: unknown, fallback: number) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function rowToHeroSlideRecord(row: Record<string, unknown>): HeroSlideRecord {
  return {
    id: String(row.id ?? row[0]),
    alt: String(row.alt ?? row[1]),
    imageUrl: String(row.image_url ?? row[2]),
    imageKey: String(row.image_key ?? row[3] ?? ""),
    sortOrder: parseNumber(row.sort_order ?? row[4], 0),
  };
}

export async function listHeroSlides(): Promise<HeroSlide[]> {
  const records = await listHeroSlideRecords();
  return records.map(({ id, alt, imageUrl }) => ({ id, alt, imageUrl }));
}

export async function listHeroSlideRecords(): Promise<HeroSlideRecord[]> {
  await initTursoHeroSlides();

  const client = getTursoClient();
  const rs = await client.execute(`
    SELECT id, alt, image_url, image_key, sort_order
    FROM hero_slides
    ORDER BY sort_order ASC, created_at ASC
  `);

  const rows = rs.rows ?? [];
  return rows.map((row) => rowToHeroSlideRecord(row as Record<string, unknown>));
}

export async function getHeroSlide(id: string): Promise<HeroSlideRecord | null> {
  await initTursoHeroSlides();

  const client = getTursoClient();
  const rs = await client.execute(
    `
    SELECT id, alt, image_url, image_key, sort_order
    FROM hero_slides
    WHERE id = ?
    LIMIT 1
  `,
    [id],
  );

  const row = rs.rows?.[0] as Record<string, unknown> | undefined;
  if (!row) return null;

  return rowToHeroSlideRecord(row);
}

async function getNextSortOrder() {
  const client = getTursoClient();
  const rs = await client.execute(
    "SELECT COALESCE(MAX(sort_order), -1) as max_order FROM hero_slides",
  );
  const maxRaw =
    (rs.rows[0] as Record<string, unknown>)?.max_order ??
    (rs.rows[0] as unknown[])?.[0] ??
    -1;
  const max = parseNumber(maxRaw, -1);
  return max + 1;
}

export async function createHeroSlide(
  input: HeroSlideCreateInput,
): Promise<HeroSlideRecord> {
  await initTursoHeroSlides();

  const client = getTursoClient();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const sortOrder = input.sortOrder ?? (await getNextSortOrder());

  await client.execute(
    `
    INSERT INTO hero_slides (
      id, alt, image_url, image_key, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      input.alt,
      input.imageUrl,
      input.imageKey,
      sortOrder,
      now,
      now,
    ],
  );

  return {
    id,
    alt: input.alt,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey,
    sortOrder,
  };
}

export async function updateHeroSlide(
  id: string,
  input: HeroSlideUpdateInput,
): Promise<HeroSlideRecord | null> {
  await initTursoHeroSlides();

  const current = await getHeroSlide(id);
  if (!current) return null;

  const next = {
    alt: input.alt ?? current.alt,
    imageUrl: input.imageUrl ?? current.imageUrl,
    imageKey: input.imageKey ?? current.imageKey,
    sortOrder: input.sortOrder ?? current.sortOrder,
  };

  const client = getTursoClient();
  const now = new Date().toISOString();

  await client.execute(
    `
    UPDATE hero_slides
    SET alt = ?, image_url = ?, image_key = ?, sort_order = ?, updated_at = ?
    WHERE id = ?
  `,
    [
      next.alt,
      next.imageUrl,
      next.imageKey,
      next.sortOrder,
      now,
      id,
    ],
  );

  return {
    id,
    ...next,
  };
}

export async function deleteHeroSlide(id: string): Promise<boolean> {
  await initTursoHeroSlides();

  const client = getTursoClient();
  const rs = await client.execute(`DELETE FROM hero_slides WHERE id = ?`, [id]);
  return (rs.rowsAffected ?? 0) > 0;
}
