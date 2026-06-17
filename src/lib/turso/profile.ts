import type { Profile } from "@/types/profile";
import { EMPTY_PROFILE, PROFILE_ID } from "./defaults";
import { getTursoClient } from "./client";
import { initTursoProfile } from "./init";

export type ProfileRecord = Profile & {
  imageKey: string;
};

function rowToProfile(row: Record<string, unknown>): ProfileRecord {
  return {
    name: String(row.name ?? row[1]),
    bio: String(row.bio ?? row[2]),
    imageUrl: String(row.image_url ?? row[3]),
    imageKey: String(row.image_key ?? row[4] ?? ""),
  };
}

export async function getProfile(): Promise<Profile> {
  const record = await getProfileRecord();
  return {
    name: record.name,
    bio: record.bio,
    imageUrl: record.imageUrl,
  };
}

export async function getProfileRecord(): Promise<ProfileRecord> {
  await initTursoProfile();

  const client = getTursoClient();
  const rs = await client.execute(
    `
    SELECT id, name, bio, image_url, image_key
    FROM profile
    WHERE id = ?
    LIMIT 1
  `,
    [PROFILE_ID],
  );

  const row = rs.rows?.[0] as Record<string, unknown> | undefined;
  if (!row) {
    return {
      ...EMPTY_PROFILE,
      imageKey: "",
    };
  }

  return rowToProfile(row);
}

export type ProfileUpdateInput = {
  name: string;
  bio: string;
  imageUrl: string;
  imageKey: string;
};

export async function updateProfile(input: ProfileUpdateInput): Promise<ProfileRecord> {
  await initTursoProfile();

  const client = getTursoClient();
  const now = new Date().toISOString();

  await client.execute(
    `
    UPDATE profile
    SET name = ?, bio = ?, image_url = ?, image_key = ?, updated_at = ?
    WHERE id = ?
  `,
    [
      input.name,
      input.bio,
      input.imageUrl,
      input.imageKey,
      now,
      PROFILE_ID,
    ],
  );

  return {
    name: input.name,
    bio: input.bio,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey,
  };
}
