// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { initSchema } from './schema';

const dataDir = path.join(process.cwd(), 'data');
if (!process.env.SQLITE_PATH && !fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.SQLITE_PATH ?? path.join(dataDir, 'app.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

initSchema(db);

export default db;
