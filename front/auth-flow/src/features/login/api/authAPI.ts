import type { AuthRequestBody, LoginLocalResponse, RegisterResponse } from '../model/authTypes';

import {LS_KEYS} from '@/shared/constants/localStorageKeys.ts';

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

    localStorage.setItem(LS_KEYS.AUTH_TOKEN, data.token);
    localStorage.setItem(LS_KEYS.REFRESH_TOKEN, data.refreshToken);

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

    localStorage.setItem(LS_KEYS.AUTH_TOKEN, data.token);
    localStorage.setItem(LS_KEYS.REFRESH_TOKEN, data.refreshToken);

    return data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem(LS_KEYS.AUTH_TOKEN);

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
    localStorage.setItem(LS_KEYS.AUTH_TOKEN, data.token);
    return data;
  },

  logout() {
    localStorage.removeItem(LS_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LS_KEYS.REFRESH_TOKEN);
  },
};
