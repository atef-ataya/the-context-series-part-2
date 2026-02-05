import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// ─── Search Tool ─────────────────────────────
// Searches the web via DuckDuckGo Instant Answer API.
// In production, swap for Serper, SerpAPI, or Brave Search for richer results.
//
// ⚠️ v1 BREAKING CHANGE: execute receives (inputData, context) — NOT ({ input, context })

export const searchTool = createTool({
  id: "search",
  description:
    "Search the web for information on a topic. Returns relevant snippets and URLs.",

  inputSchema: z.object({
    query: z.string().describe("The search query to execute"),
    maxResults: z
      .number()
      .default(5)
      .describe("Maximum number of results to return"),
  }),

  // v1 signature: inputData is the first parameter directly
  execute: async (inputData) => {
    const { query, maxResults } = inputData;

    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
    );
    const data = await response.json();

    // Format results from DuckDuckGo's RelatedTopics
    const results =
      data.RelatedTopics?.slice(0, maxResults).map((topic: any) => ({
        title: topic.Text?.split(" - ")[0] || "Untitled",
        snippet: topic.Text || "",
        url: topic.FirstURL || "",
      })) || [];

    return {
      query,
      results,
      searchedAt: new Date().toISOString(),
      resultCount: results.length,
    };
  },
});
