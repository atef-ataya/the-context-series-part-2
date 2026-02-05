import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export const saveTool = createTool({
  id: "save",
  description: "Save research findings to a file.",
  inputSchema: z.object({
    title: z.string(),
    content: z.string(),
  }),
  execute: async (inputData) => {
    const { title, content } = inputData;

    console.log("💾 [Save Tool] Saving:", title);

    const researchDir = join(process.cwd(), "research");
    if (!existsSync(researchDir)) {
      mkdirSync(researchDir, { recursive: true });
    }

    const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".md";
    const filepath = join(researchDir, filename);
    writeFileSync(filepath, `# ${title}\n\n${content}`);

    return { saved: true, filepath };
  },
});
