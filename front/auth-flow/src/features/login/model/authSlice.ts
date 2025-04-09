import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {NullableType, selectModeLSOrCookieType} from 'shared/types';

import {LS_KEYS} from '@/shared/constants/localStorageKeys.ts';

interface AuthState {
  token: NullableType<string>;
  refreshToken: NullableType<string>;
  username: NullableType<string>;
  isAuth: boolean;
  mode: NullableType<selectModeLSOrCookieType>;
  isAppReady: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  username: null,
  isAuth: false,
  mode: null,
  isAppReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
          token?: string;
          refreshToken?: string;
          username?: string;
          mode: selectModeLSOrCookieType;
        }>,
    ) => {
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.username = action.payload.username || null;
      state.isAuth = true;
      state.mode = action.payload.mode;
    },
    logout: (state) => {
      localStorage.removeItem(LS_KEYS.AUTH_TOKEN);
      localStorage.removeItem(LS_KEYS.REFRESH_TOKEN);
      state.token = null;
      state.refreshToken = null;
      state.username = null;
      state.isAuth = false;
      state.mode = null;
    },
    setAppReady: (state) => {
      state.isAppReady = true;
    },
  },
});

export const { setCredentials, logout, setAppReady } = authSlice.actions;
export default authSlice.reducer;
