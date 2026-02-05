import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const searchTool = createTool({
  id: "search",
  description: "Search the web for information on a topic.",
  inputSchema: z.object({
    query: z.string().describe("The search query to execute"),
    maxResults: z.number().default(5),
  }),
  execute: async (inputData) => {
    const { query, maxResults } = inputData;
    console.log("🔍 [Search Tool] Querying:", query);

    // Use Serper if key available, fallback to DuckDuckGo
    if (process.env.SERPER_API_KEY) {
      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: query, num: maxResults }),
      });
      const data = await response.json();
      const results = data.organic?.slice(0, maxResults).map((r: any) => ({
        title: r.title,
        snippet: r.snippet,
        url: r.link,
      })) || [];
      return { query, results, searchedAt: new Date().toISOString(), resultCount: results.length };
    }

    // Fallback: DuckDuckGo
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
    );
    const data = await response.json();
    const results = data.RelatedTopics?.slice(0, maxResults).map((topic: any) => ({
      title: topic.Text?.split(" - ")[0] || "Untitled",
      snippet: topic.Text || "",
      url: topic.FirstURL || "",
    })) || [];

    return { query, results, searchedAt: new Date().toISOString(), resultCount: results.length };
  },
});
