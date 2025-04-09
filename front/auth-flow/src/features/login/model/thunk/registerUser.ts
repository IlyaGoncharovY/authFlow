import { authAPI } from '../../api/authAPI.ts';

import { setCredentials, logout } from '../authSlice.ts';

import { AppThunk } from '@/store/store.ts';

export const registerUser =
    (username: string, password: string): AppThunk =>
      async (dispatch) => {
        try {
          const res = await authAPI.register({ username, password });

          dispatch(
            setCredentials({
              token: res.token,
              refreshToken: res.refreshToken,
              username: res.username,
              mode: 'local',
            }),
          );
        } catch (err) {
          console.error('Ошибка регистрации:', err);
          dispatch(logout());
        }
      };
