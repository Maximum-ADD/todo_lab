# Third-Party Code

Every dependency you deliberately installed, with one honest sentence on why. Keep this
list in sync with `package.json` — don't list something you removed, don't omit
something you added.

| Package | Why it was chosen |
|---|---|
| `next` | Framework required by the brief; App Router gives file-based routing and Server Actions without a separate API layer. |
| `better-sqlite3` | Synchronous SQLite driver — no callback/Promise overhead for a local single-user app, and the most widely used SQLite binding for Node. |
| `@types/better-sqlite3` | Type definitions so TypeScript can check calls into the database layer at compile time. |
| *(test runner, once chosen)* | *e.g. "Vitest — fast, works with TypeScript out of the box, no extra config for a small project."* |
| *(anything else you add)* | |

> Note for the rubric: a bare list without reasons scores as "Partial," not "Complete."
> One real sentence per row is enough — don't over-write this.

This Markdown template was generated with Claude-Web(Sonnet-5)