import type { Artwork } from "@/data/artworks";
import { artworks } from "@/data/artworks";
import { getTursoClient } from "./client";

let initPromise: Promise<void> | null = null;

function toIsoNow() {
  return new Date().toISOString();
}

async function tableExistsCheck() {
  const client = getTursoClient();
  const rs = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='artworks' LIMIT 1",
  );
  return rs.rows.length > 0;
}

async function ensureArtworksTable() {
  const client = getTursoClient();

  await client.batch(
    [
      `
      CREATE TABLE IF NOT EXISTS artworks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        comment TEXT NOT NULL,
        image_url TEXT NOT NULL,
        image_key TEXT NOT NULL DEFAULT '',
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      `,
    ],
    "write",
  );
}

async function seedArtworksIfEmpty() {
  const client = getTursoClient();

  const rs = await client.execute("SELECT COUNT(*) as count FROM artworks");
  const countRaw = (rs.rows[0] as any)?.count ?? (rs.rows[0] as any)?.[0] ?? 0;
  const count = typeof countRaw === "string" ? Number(countRaw) : Number(countRaw);

  if (count > 0) return;

  const now = toIsoNow();

  const inserts = artworks
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((artwork: Artwork, index: number) => {
      return {
        sql: `
          INSERT INTO artworks (
            id, title, date, comment, image_url, image_key,
            width, height, sort_order, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          artwork.id,
          artwork.title,
          artwork.date,
          artwork.comment,
          artwork.imageUrl,
          "",
          artwork.width,
          artwork.height,
          index,
          now,
          now,
        ],
      };
    });

  if (inserts.length === 0) return;

  await client.batch(inserts, "write");
}

export async function initTursoArtworks() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await ensureArtworksTable();
    await seedArtworksIfEmpty();
  })();

  return initPromise;
}

