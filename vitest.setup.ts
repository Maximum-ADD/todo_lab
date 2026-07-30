import fs from 'fs';
import path from 'path';
import { vi } from 'vitest';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

const testDbPath = path.join(process.cwd(), 'test.db');

// Wipe any leftover file from a previous crashed run
if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

process.env.SQLITE_PATH = testDbPath;