import { authAPI } from '../../api/authAPI.ts';

import { setCredentials, logout } from '../authSlice.ts';

import { AppThunk } from '@/store/store.ts';

export const loginUser =
    (username: string, password: string, mode: 'local' | 'cookie'): AppThunk =>
      async (dispatch) => {
        try {
          const res = await authAPI.auth({ username, password });

          dispatch(
            setCredentials({
              token: res.token,
              refreshToken: res.refreshToken,
              username: res.username,
              mode: mode,
            }),
          );
        } catch (err) {
          console.error('Ошибка логина:', err);
          dispatch(logout());
        }
      };
