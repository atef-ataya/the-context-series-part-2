import { ResearchChat } from "./components/ResearchChat";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Research Agent
          </h1>
          <p className="text-gray-500 text-sm">
            Powered by Mastra v1 — TypeScript-native AI agents
          </p>
        </div>

        {/* Chat Interface */}
        <ResearchChat />
      </div>
    </main>
  );
}
