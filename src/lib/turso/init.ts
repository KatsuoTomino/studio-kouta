import { getTursoClient } from "./client";
import { EMPTY_PROFILE, PROFILE_ID } from "./defaults";

let initPromise: Promise<void> | null = null;

function toIsoNow() {
  return new Date().toISOString();
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
  const countRaw = (rs.rows[0] as Record<string, unknown>)?.count ?? 0;
  const count =
    typeof countRaw === "string" ? Number(countRaw) : Number(countRaw);

  if (count > 0) return;

  const now = toIsoNow();

  await client.execute(
    `
      INSERT INTO profile (id, name, bio, image_url, image_key, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      PROFILE_ID,
      EMPTY_PROFILE.name,
      EMPTY_PROFILE.bio,
      EMPTY_PROFILE.imageUrl,
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

export async function initTursoHeroSlides() {
  await ensureHeroSlidesTable();
}

export async function initTursoArtworks() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await ensureArtworksTable();
    await initTursoProfile();
    await initTursoHeroSlides();
  })();

  return initPromise;
}
