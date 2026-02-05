import { Mastra } from "@mastra/core/mastra";
import { Memory } from "@mastra/memory";
import { PgStore, PgVector } from "@mastra/pg";
import { researchAgent } from "./agents/research";

// ─── Memory Configuration ────────────────────
// Uses PostgreSQL for both conversation storage and vector search.
// Requires DATABASE_URL in .env.local and `npx mastra db:push` to run migrations.
// If DATABASE_URL is not set, the agent works without memory.
const memory = process.env.DATABASE_URL
  ? new Memory({
      storage: new PgStore({
        connectionString: process.env.DATABASE_URL,
      }),
      vector: new PgVector({
        connectionString: process.env.DATABASE_URL,
      }),
    })
  : undefined;

// ─── Mastra Instance ─────────────────────────
export const mastra = new Mastra({
  agents: { researchAgent },
  memory,
  server: {
    port: 4111,
    timeout: 30000,
  },
});
