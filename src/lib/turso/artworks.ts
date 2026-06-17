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

function rowToArtwork(row: any): Artwork {
  const width = parseNumber(row.width ?? row[6], 800);
  const height = parseNumber(row.height ?? row[7], 800);

  return {
    id: String(row.id ?? row[0]),
    title: String(row.title ?? row[1]),
    date: String(row.date ?? row[2]),
    comment: String(row.comment ?? row[3]),
    imageUrl: String(row.image_url ?? row[4]),
    imageKey: typeof row.image_key === "string" ? row.image_key : "",
    width,
    height,
  };
}

export async function listArtworks(): Promise<Artwork[]> {
  await initTursoArtworks();

  const client = getTursoClient();
  const rs = await client.execute(`
    SELECT
      id,
      title,
      date,
      comment,
      image_url,
      image_key,
      width,
      height,
      sort_order,
      created_at
    FROM artworks
    ORDER BY sort_order ASC, created_at DESC
  `);

  const rows = rs.rows ?? [];
  return rows.map((row: any) => {
    // SELECT した列順に合わせるためのフォールバック
    const mapped = {
      id: row.id ?? row[0],
      title: row.title ?? row[1],
      date: row.date ?? row[2],
      comment: row.comment ?? row[3],
      image_url: row.image_url ?? row[4],
      image_key: row.image_key ?? row[5],
      width: row.width ?? row[6],
      height: row.height ?? row[7],
    };

    return rowToArtwork(mapped);
  });
}

export async function getArtwork(id: string): Promise<Artwork | null> {
  await initTursoArtworks();

  const client = getTursoClient();
  const rs = await client.execute(
    `
    SELECT id, title, date, comment, image_url, image_key, width, height
    FROM artworks
    WHERE id = ?
    LIMIT 1
  `,
    [id],
  );

  const row = rs.rows?.[0] as any | undefined;
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
      id, title, date, comment, image_url, image_key,
      width, height, sort_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      id,
      input.title,
      input.date,
      input.comment,
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
    title: input.title,
    date: input.date,
    comment: input.comment,
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
    title: input.title ?? current.title,
    date: input.date ?? current.date,
    comment: input.comment ?? current.comment,
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
      date = ?,
      comment = ?,
      image_url = ?,
      image_key = ?,
      width = ?,
      height = ?,
      updated_at = ?
    WHERE id = ?
  `,
    [
      next.title,
      next.date,
      next.comment,
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

