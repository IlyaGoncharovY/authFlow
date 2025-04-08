import {logout, setAppReady, setCredentials} from '../authSlice.ts';

import { AppThunk } from '@/store/store.ts';
import {authAPI} from '@/features/login/api/authAPI.ts';


export const restoreSession = (): AppThunk => async (dispatch) => {
  // const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('auth_refresh');
  const username = '';

  if (refreshToken) {
    try {
      const res = await authAPI.refreshToken();
      dispatch(
        setCredentials({
          token: res.token,
          refreshToken,
          username,
          mode: 'local',
        }),
      );
    } catch (err) {
      console.error('Ошибка refresh токена:', err);
      dispatch(logout());
    }
  } else {
    dispatch(logout());
  }

  dispatch(setAppReady());
};
