import { Agent } from '@mastra/core/agent';
import { searchTool, saveTool } from '../tools';
import { Memory } from '@mastra/memory';
import { PostgresStore } from '@mastra/pg';

const memory = process.env.DATABASE_URL
  ? new Memory({
      storage: new PostgresStore({
        id: 'pg-storage',
        connectionString: process.env.DATABASE_URL,
      }),
    })
  : undefined;

export const researchAgent = new Agent({
  name: 'researchAgent',
  instructions: `You are a research assistant. When given a topic:
1. Search for recent information using the search tool
2. Summarize the key findings clearly
3. Save the summary using the save tool for later reference

Be thorough but concise. Cite your sources when possible.
If you can't find relevant information, say so clearly.`,
  model: 'openai/gpt-4o',
  tools: { search: searchTool, save: saveTool },
  memory,
});
