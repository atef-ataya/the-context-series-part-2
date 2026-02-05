import { Mastra } from "@mastra/core/mastra";
import { researchAgent } from "./agents/research";

export const mastra = new Mastra({
  agents: { researchAgent },
});
