import { authAPI } from '../../api/authAPI.ts';

import { setCredentials, logout } from '../authSlice.ts';

import { AppThunk } from '@/store/store.ts';

export const loginUser =
    (username: string, password: string, mode: 'local' | 'cookie'): AppThunk =>
      async (dispatch) => {
        try {
          const res = await authAPI.auth({ username, password }, mode);

          if (mode === 'local' && res) {
            dispatch(
              setCredentials({
                token: res.token,
                refreshToken: res.refreshToken,
                username: res.username,
                mode,
              }),
            );
          } else {
            dispatch(
              setCredentials({
                token: undefined,
                refreshToken: undefined,
                username,
                mode,
              }),
            );
          }
        } catch (err) {
          console.error('Ошибка логина:', err);
          dispatch(logout());
        }
      };
