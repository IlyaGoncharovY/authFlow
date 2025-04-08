import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
  isAuth: boolean;
  mode: 'local' | 'cookie' | null;
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
          mode: 'local' | 'cookie';
        }>,
    ) => {
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.username = action.payload.username || null;
      state.isAuth = true;
      state.mode = action.payload.mode;
    },
    logout: (state) => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh');
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
