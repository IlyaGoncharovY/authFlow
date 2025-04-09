import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';

import authSlice from '../features/login/model/authSlice.ts';

const rootReducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(authAPI.middleware),
  devTools: import.meta.env.MODE === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
