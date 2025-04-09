import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve(__dirname, '../storage/users.json');

export interface StoredUser {
    username: string;
    password: string;
}

export async function readUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as StoredUser[];
  } catch {
    return [];
  }
}

export async function saveUsers(users: StoredUser[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
}
