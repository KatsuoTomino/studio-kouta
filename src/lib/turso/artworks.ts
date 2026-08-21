import type { Artwork } from "@/types/artwork";
import { initTursoArtworks } from "./init";
import { getTursoClient } from "./client";

export type ArtworkCreateInput = Omit<Artwork, "id"> & {
  sortOrder?: number;
  imageKey?: string;
};

export type ArtworkUpdateInput = Partial<ArtworkCreateInput>;

function parseNumber(value: unknown, fallback: number) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function rowToArtwork(row: Record<string, unknown>): Artwork {
  return {
    id: String(row.id ?? ""),
    titleJa: String(row.title ?? ""),
    titleEn: String(row.title_en ?? ""),
    date: String(row.date ?? ""),
    commentJa: String(row.comment ?? ""),
    commentEn: String(row.comment_en ?? ""),
    imageUrl: String(row.image_url ?? ""),
    imageKey: typeof row.image_key === "string" ? row.image_key : "",
    width: parseNumber(row.width, 800),
    height: parseNumber(row.height, 800),
  };
}

const artworkSelectColumns = `
  id,
  title,
  title_en,
  date,
  comment,
  comment_en,
  image_url,
  image_key,
  width,
  height
`;

export async function listArtworks(): Promise<Artwork[]> {
  await initTursoArtworks();

  const client = getTursoClient();
  const rs = await client.execute(`
    SELECT
      ${artworkSelectColumns},
      sort_order,
      created_at
    FROM artworks
    ORDER BY sort_order ASC, created_at DESC
  `);

  return (rs.rows ?? []).map((row) =>
    rowToArtwork(row as Record<string, unknown>),
  );
}

export async function getArtwork(id: string): Promise<Artwork | null> {
  await initTursoArtworks();

  const client = getTursoClient();
  const rs = await client.execute(
    `
    SELECT ${artworkSelectColumns}
    FROM artworks
    WHERE id = ?
    LIMIT 1
  `,
    [id],
  );

  const row = rs.rows?.[0] as Record<string, unknown> | undefined;
  if (!row) return null;

  return rowToArtwork(row);
}

export async function createArtwork(input: ArtworkCreateInput): Promise<Artwork> {
  await initTursoArtworks();

  const client = getTursoClient();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const sortOrder = input.sortOrder ?? 0;

  await client.execute(
    `
    INSERT INTO artworks (
      id, title, title_en, date, comment, comment_en, image_url, image_key,
      width, height, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      input.titleJa,
      input.titleEn,
      input.date,
      input.commentJa,
      input.commentEn,
      input.imageUrl,
      input.imageKey ?? "",
      input.width,
      input.height,
      sortOrder,
      now,
      now,
    ],
  );

  return {
    id,
    titleJa: input.titleJa,
    titleEn: input.titleEn,
    date: input.date,
    commentJa: input.commentJa,
    commentEn: input.commentEn,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey ?? "",
    width: input.width,
    height: input.height,
  };
}

export async function updateArtwork(
  id: string,
  input: ArtworkUpdateInput,
): Promise<Artwork | null> {
  await initTursoArtworks();

  const client = getTursoClient();
  const now = new Date().toISOString();

  const current = await getArtwork(id);
  if (!current) return null;

  const next = {
    titleJa: input.titleJa ?? current.titleJa,
    titleEn: input.titleEn ?? current.titleEn,
    date: input.date ?? current.date,
    commentJa: input.commentJa ?? current.commentJa,
    commentEn: input.commentEn ?? current.commentEn,
    imageUrl: input.imageUrl ?? current.imageUrl,
    imageKey: input.imageKey ?? current.imageKey ?? "",
    width: input.width ?? current.width,
    height: input.height ?? current.height,
  };

  await client.execute(
    `
    UPDATE artworks
    SET
      title = ?,
      title_en = ?,
      date = ?,
      comment = ?,
      comment_en = ?,
      image_url = ?,
      image_key = ?,
      width = ?,
      height = ?,
      updated_at = ?
    WHERE id = ?
  `,
    [
      next.titleJa,
      next.titleEn,
      next.date,
      next.commentJa,
      next.commentEn,
      next.imageUrl,
      next.imageKey,
      next.width,
      next.height,
      now,
      id,
    ],
  );

  return {
    id,
    ...next,
  };
}

export async function deleteArtwork(id: string): Promise<boolean> {
  await initTursoArtworks();

  const client = getTursoClient();
  const rs = await client.execute(`DELETE FROM artworks WHERE id = ?`, [id]);
  return (rs.rowsAffected ?? 0) > 0;
}
