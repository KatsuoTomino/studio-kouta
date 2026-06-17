import type { Artwork } from "@/data/artworks";
import { artworks, heroSlides as defaultHeroSlides, profile as defaultProfile } from "@/data/artworks";
import { getTursoClient } from "./client";

const PROFILE_ID = "default";

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

async function ensureProfileTable() {
  const client = getTursoClient();

  await client.batch(
    [
      `
      CREATE TABLE IF NOT EXISTS profile (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        bio TEXT NOT NULL,
        image_url TEXT NOT NULL,
        image_key TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      `,
    ],
    "write",
  );
}

async function seedProfileIfEmpty() {
  const client = getTursoClient();

  const rs = await client.execute("SELECT COUNT(*) as count FROM profile");
  const countRaw = (rs.rows[0] as any)?.count ?? (rs.rows[0] as any)?.[0] ?? 0;
  const count = typeof countRaw === "string" ? Number(countRaw) : Number(countRaw);

  if (count > 0) return;

  const now = toIsoNow();

  await client.execute(
    `
      INSERT INTO profile (id, name, bio, image_url, image_key, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      PROFILE_ID,
      defaultProfile.name,
      defaultProfile.bio,
      defaultProfile.imageUrl,
      "",
      now,
    ],
  );
}

export async function initTursoProfile() {
  await ensureProfileTable();
  await seedProfileIfEmpty();
}

async function ensureHeroSlidesTable() {
  const client = getTursoClient();

  await client.batch(
    [
      `
      CREATE TABLE IF NOT EXISTS hero_slides (
        id TEXT PRIMARY KEY,
        alt TEXT NOT NULL,
        image_url TEXT NOT NULL,
        image_key TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      `,
    ],
    "write",
  );
}

async function seedHeroSlidesIfEmpty() {
  const client = getTursoClient();

  const rs = await client.execute("SELECT COUNT(*) as count FROM hero_slides");
  const countRaw = (rs.rows[0] as any)?.count ?? (rs.rows[0] as any)?.[0] ?? 0;
  const count = typeof countRaw === "string" ? Number(countRaw) : Number(countRaw);

  if (count > 0) return;

  const now = toIsoNow();

  const inserts = defaultHeroSlides.map((slide, index) => ({
    sql: `
      INSERT INTO hero_slides (
        id, alt, image_url, image_key, sort_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [slide.id, slide.alt, slide.imageUrl, "", index, now, now],
  }));

  if (inserts.length === 0) return;

  await client.batch(inserts, "write");
}

export async function initTursoHeroSlides() {
  await ensureHeroSlidesTable();
  await seedHeroSlidesIfEmpty();
}

export async function initTursoArtworks() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await ensureArtworksTable();
    await seedArtworksIfEmpty();
    await initTursoProfile();
    await initTursoHeroSlides();
  })();

  return initPromise;
}

