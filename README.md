# Research Agent — Mastra v1

A full-stack AI research agent built with **Mastra v1**, **TypeScript**, and **Next.js**.

The agent searches the web, summarizes findings, and saves results — all with streaming, type safety, and persistent memory.

> From **The Architect's Playbook S2E04** — "The Full-Stack Agent Era: Mastra v1 + Cedar-OS"

---

## Quick Start

### Prerequisites

- **Node.js 22.13.0+** — `nvm install 22`
- **Any LLM API key** (OpenAI recommended)
- **PostgreSQL** (optional, for memory persistence)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and add your API keys
```

### 3. Set up memory (optional)

```bash
# Start PostgreSQL with Docker
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15

# Run Mastra migrations
npx mastra db:push
```

### 4. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start researching.

---

## Project Structure

```
my-research-agent/
├── app/
│   ├── api/research/route.ts   # Next.js API route (streaming)
│   ├── components/
│   │   └── ResearchChat.tsx     # React chat interface
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/mastra/
│   ├── index.ts                 # Mastra instance config
│   ├── agents/
│   │   └── research.ts          # Agent definition + model routing
│   └── tools/
│       ├── index.ts             # Barrel exports
│       ├── search.ts            # Web search tool
│       └── save.ts              # File save tool
├── .env.example
├── package.json
└── tsconfig.json
```

---

## v1 Patterns Used

This project uses the **correct Mastra v1 patterns** (not beta):

| Pattern | v1 (this project) | Beta (old) |
|---|---|---|
| Imports | `@mastra/core/tools` | `@mastra/core` |
| Tool execute | `(inputData) => { ... }` | `({ input, context }) => { ... }` |
| Memory | `Memory` + `PgStore` + `PgVector` | `PostgresMemory` |
| Zod | v4 required | v3 |

---

## Model Routing

Switch providers by changing one string:

```typescript
// OpenAI
model: "openai/gpt-4o"

// Anthropic
model: "anthropic/claude-sonnet-4-20250514"

// Google
model: "google/gemini-2.0-flash"

// Local (Ollama — no API key needed)
model: "ollama/llama3"
```

---

## Key Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run mastra:dev` | Start Mastra standalone dev server (port 4111) |
| `npm run mastra:db:push` | Run database migrations for memory |
| `npm run build` | Production build |

---

## Learn More

- [Mastra Docs](https://mastra.ai)
- [Tutorial Code](https://github.com/) *(replace with your repo link)*
- [The Architect's Playbook](https://shop.atefataya.com)
