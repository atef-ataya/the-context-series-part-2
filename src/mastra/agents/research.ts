import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { PgStore, PgVector } from "@mastra/pg";
import { searchTool, saveTool } from "../tools";

// ─── Agent Memory ────────────────────────────
// Attached directly to the agent so it remembers past conversations.
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

// ─── Research Agent ──────────────────────────
export const researchAgent = new Agent({
  name: "research-agent",

  instructions: `You are a research assistant. When given a topic:
1. Search for recent information using the search tool
2. Summarize the key findings clearly
3. Save the summary using the save tool for later reference

Be thorough but concise. Cite your sources when possible.
If you can't find relevant information, say so clearly.`,

  // Model routing — change the string to switch providers instantly
  model: "openai/gpt-4o",

  // Automatic fallback chain — if OpenAI is down, try Claude, then Gemini
  // Uncomment below and comment out the simple model string above to enable:
  //
  // model: {
  //   provider: "openai",
  //   name: "gpt-4o",
  //   fallback: {
  //     provider: "anthropic",
  //     name: "claude-sonnet-4-20250514",
  //   },
  // },

  tools: {
    search: searchTool,
    save: saveTool,
  },

  // Attach memory for conversation persistence
  ...(memory ? { memory } : {}),
});
