export function logUserAction(action: 'register' | 'login', username: string, token: string) {
  const label = action === 'register' ? '✅ Зарегистрирован' : '✅ Вошёл в систему';
  console.log(`${label} пользователь "${username}"`);
  console.log(`🔐 Токен: ${token}`);
}
