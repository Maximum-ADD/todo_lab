import { vi } from 'vitest';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));


process.env.SQLITE_PATH = ':memory:';
