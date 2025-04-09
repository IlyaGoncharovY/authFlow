import type {AuthRequestBody, LoginLocalResponse} from '../model/authTypes';

import {LS_KEYS} from '@/shared/constants/localStorageKeys.ts';
import {selectModeLSOrCookieType} from '@/shared/types';

const API_URL = 'http://localhost:2999/api/auth';

export const authAPI = {
  /**
   * Универсальная функция авторизации (localStorage или cookie)
   */
  async auth(
    { username, password }: AuthRequestBody,
    mode: selectModeLSOrCookieType = 'local',
  ): Promise<LoginLocalResponse | void> {
    const endpoint = mode === 'cookie' ? '/login-cookie' : '/login-local';

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      credentials: mode === 'cookie' ? 'include' : 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Ошибка авторизации');
    }

    if (mode === 'local') {
      const data: LoginLocalResponse = await res.json();

      localStorage.setItem(LS_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(LS_KEYS.REFRESH_TOKEN, data.refreshToken);

      return data;
    } else {
      await res.json();
      return;
    }
  },

  async register({ username, password }: AuthRequestBody): Promise<LoginLocalResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Ошибка регистрации');
    }

    const data: LoginLocalResponse = await res.json();

    localStorage.setItem(LS_KEYS.AUTH_TOKEN, data.token);
    localStorage.setItem(LS_KEYS.REFRESH_TOKEN, data.refreshToken);

    return data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem(LS_KEYS.REFRESH_TOKEN);

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

  async logout(): Promise<void> {
    localStorage.removeItem(LS_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LS_KEYS.REFRESH_TOKEN);

    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },
};
