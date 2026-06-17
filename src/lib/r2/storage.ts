import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, getR2Config } from "./client";

const ALLOWED_CONTENT_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export type UploadedArtworkImage = {
  imageKey: string;
  imageUrl: string;
};

export function buildPublicImageUrl(imageKey: string) {
  const { publicUrl } = getR2Config();
  return `${publicUrl.replace(/\/$/, "")}/${imageKey}`;
}

export async function uploadArtworkObject(
  body: Uint8Array,
  contentType: string,
): Promise<UploadedArtworkImage> {
  return uploadImageObject("artworks", body, contentType);
}

export async function uploadProfileObject(
  body: Uint8Array,
  contentType: string,
): Promise<UploadedArtworkImage> {
  return uploadImageObject("profile", body, contentType);
}

export async function uploadHeroObject(
  body: Uint8Array,
  contentType: string,
): Promise<UploadedArtworkImage> {
  return uploadImageObject("hero", body, contentType);
}

async function uploadImageObject(
  prefix: "artworks" | "profile" | "hero",
  body: Uint8Array,
  contentType: string,
): Promise<UploadedArtworkImage> {
  const ext = ALLOWED_CONTENT_TYPES.get(contentType);
  if (!ext) {
    throw new Error("Unsupported image type. Use JPEG, PNG, WebP, or GIF.");
  }

  if (body.byteLength > MAX_FILE_SIZE_BYTES) {
    throw new Error("Image must be 10MB or smaller.");
  }

  const imageKey = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const { bucketName } = getR2Config();
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
      Body: body,
      ContentType: contentType,
    }),
  );

  return {
    imageKey,
    imageUrl: buildPublicImageUrl(imageKey),
  };
}

export async function deleteArtworkObject(imageKey: string) {
  if (!imageKey) return;

  const { bucketName } = getR2Config();
  const client = getR2Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
    }),
  );
}
