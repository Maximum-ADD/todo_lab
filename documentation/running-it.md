# Running It

## Requirements

- Node.js: `v22.17.1`
- npm: `v11.6.0`
- Windows users: Visual Studio Build Tools with the "Desktop development with C++"
  workload is required to compile `better-sqlite3`'s native module. See:
  https://visualstudio.microsoft.com/visual-cpp-build-tools/

## Install

```bash
git clone https://github.com/Maximum-ADD/todo_lab.git
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
npm test
```

Tests run against a throwaway database (`test.db`, controlled via the `SQLITE_PATH`
environment variable in `vitest.setup.ts`), not `data/app.db` — running them will not
affect or require any data you've created by using the app. `test.db` is deleted and
recreated automatically at the start of each test run.

This Markdown template was generated with Claude-Web(Sonnet-5)