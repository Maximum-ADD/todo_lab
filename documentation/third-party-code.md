# Third-Party Code

Every dependency you deliberately installed, with one honest sentence on why. Keep this
list in sync with `package.json` — don't list something you removed, don't omit
something you added.

| Package | Why it was chosen |
|---|---|
| `next` | Framework required by the brief; App Router gives file-based routing and Server Actions without a separate API layer. |
| `better-sqlite3` | Synchronous SQLite driver — no callback/Promise overhead for a local single-user app, and the most widely used SQLite binding for Node. |
| `@types/better-sqlite3` | Type definitions so TypeScript can check calls into the database layer at compile time. |
| `@dnd-kit/core` | Drag-and-drop between kanban columns (`DndContext`, `useDraggable`, `useDroppable`), without hand-rolling pointer/drop-zone logic. |
| `lucide-react` | Icon set used across the modals and cards (close, edit, archive, calendar, etc.). |
| `vitest` | Fast, TypeScript-native test runner — avoids extra Babel/ts-jest config compared to Jest, and is what Next.js's own docs currently recommend as the default. |
| `vite-tsconfig-paths` | Makes Vitest resolve the `@/*` import alias the same way Next.js does, since Vitest runs on Vite, a separate bundler that doesn't read `tsconfig.json` by default. |

This Markdown template was generated with Claude-Web(Sonnet-5)