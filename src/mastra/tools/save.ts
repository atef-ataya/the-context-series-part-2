import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ─── Save Tool ───────────────────────────────
// Saves research findings as Markdown files to the /research directory.
//
// ⚠️ v1 BREAKING CHANGE: execute receives (inputData, context) — NOT ({ input, context })

export const saveTool = createTool({
  id: "save",
  description: "Save research findings to a file for later reference",

  inputSchema: z.object({
    title: z.string().describe("Title for the research summary"),
    content: z.string().describe("The research content to save"),
    tags: z
      .array(z.string())
      .optional()
      .describe("Optional tags for categorization"),
  }),

  // v1 signature: inputData is the first parameter directly
  execute: async (inputData) => {
    const { title, content, tags } = inputData;

    // Create research directory if it doesn't exist
    const researchDir = join(process.cwd(), "research");
    if (!existsSync(researchDir)) {
      mkdirSync(researchDir, { recursive: true });
    }

    // Generate filename from title
    const filename =
      title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".md";
    const filepath = join(researchDir, filename);

    // Format content as Markdown
    const markdown = `# ${title}

${tags ? `**Tags:** ${tags.join(", ")}\n\n` : ""}**Saved:** ${new Date().toISOString()}

---

${content}
`;

    writeFileSync(filepath, markdown);

    return {
      saved: true,
      filepath,
      title,
      savedAt: new Date().toISOString(),
    };
  },
});
