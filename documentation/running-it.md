# Running It

> This doc is graded by literally being followed from a clean clone — write it as if you
> know nothing about the project. Test it yourself by deleting `node_modules` and
> `data/` and following your own instructions top to bottom.

## Requirements

- Node.js: `vX.X.X` (run `node -v` and paste the exact version you developed against)
- npm: `vX.X.X`
- Windows users: Visual Studio Build Tools with the "Desktop development with C++"
  workload is required to compile `better-sqlite3`'s native module. See:
  https://visualstudio.microsoft.com/visual-cpp-build-tools/

## Install

```bash
git clone <repo-url>
cd todo_lab
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:3000. The SQLite database file is created automatically on
first run at `data/app.db` — no manual setup step required.

## Test

```bash
<exact test command, e.g. npm test>
```

Tests run against a throwaway database (not `data/app.db`), so running them will not
affect or require any data you've created by using the app.

This Markdown template was generated with Claude-Web(Sonnet-5)