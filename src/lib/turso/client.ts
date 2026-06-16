import { createClient, type Client } from "@libsql/client";

let cachedClient: Client | null = null;

function getTursoUrl() {
  // ローカル開発時に値が未設定でも動くようにするためのフォールバック。
  // 本番では Vercel の環境変数で必ず上書きしてください。
  return process.env.TURSO_DATABASE_URL ?? "file:./local-dev.db";
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

