import Database from 'better-sqlite3';
import path from 'path';

// The .db file will be created in your project root the first time this runs
const dbPath = path.join(process.cwd(), 'data', 'app.db');

// Ensure the data folder exists
import fs from 'fs';
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new Database(dbPath);

// Recommended pragmas for a local single-user app
db.pragma('journal_mode = WAL'); // faster, safer writes

export default db;