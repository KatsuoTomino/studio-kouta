import { createClient, type Client } from "@libsql/client";

let cachedClient: Client | null = null;

function getTursoUrl() {
  // ローカル開発時に値が未設定でも動くようにするためのフォールバック。
  // 空文字も未設定扱い（vercel env pull で空の値が入ることがある）。
  // 本番では Vercel の環境変数で必ず上書きしてください。
  const url = process.env.TURSO_DATABASE_URL?.trim();
  return url ? url : "file:./local-dev.db";
}

export function getTursoClient(): Client {
  if (cachedClient) return cachedClient;

  const url = getTursoUrl();
  const authToken = process.env.TURSO_AUTH_TOKEN;

  cachedClient = createClient(
    authToken
      ? {
          url,
          authToken,
        }
      : {
          url,
        },
  );

  return cachedClient;
}

