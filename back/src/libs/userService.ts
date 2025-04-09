import bcrypt from 'bcrypt';

import { readUsers, saveUsers } from './usersStore';

export async function findUser(username: string) {
  const users = await readUsers();
  return users.find((u) => u.username === username);
}

export async function validatePassword(userPassword: string, inputPassword: string) {
  return bcrypt.compare(inputPassword, userPassword);
}

export async function createUser(username: string, password: string) {
  const users = await readUsers();
  const hashed = await bcrypt.hash(password, 10);
  await saveUsers([...users, { username, password: hashed }]);
}
