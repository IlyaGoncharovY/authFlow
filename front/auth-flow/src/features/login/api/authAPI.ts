import type { AuthRequestBody, LoginLocalResponse, RegisterResponse } from '../model/authTypes';

const API_URL = 'http://localhost:2999/api/auth';

export const authAPI = {
  async auth({ username, password }: AuthRequestBody): Promise<LoginLocalResponse> {
    const res = await fetch(`${API_URL}/login-local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Ошибка авторизации');
    }

    const data: LoginLocalResponse = await res.json();

    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_refresh', data.refreshToken);

    return data;
  },

  async register({ username, password }: AuthRequestBody): Promise<RegisterResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Ошибка регистрации');
    }

    const data: RegisterResponse = await res.json();

    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('auth_refresh', data.refreshToken);

    return data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem('auth_refresh');

    if (!refreshToken) {
      throw new Error('Refresh-токен не найден');
    }

    const res = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('Не удалось обновить токен');
    }

    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    return data;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh');
  },
};
