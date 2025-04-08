import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../store/hooks/hook.ts';

import {restoreSession} from '../features/login/model/thunk/restoreSession.ts';

import s from './App.module.css';
import {AppRouter} from './routes/AppRouter.tsx';

export const App = () => {
  const dispatch = useAppDispatch();
  const isAppReady = useAppSelector((state) => state.auth.isAppReady);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (!isAppReady) return <div>Загрузка приложения...</div>;

  return (
    <div className={s.appContainer}>
      <AppRouter />
    </div>
  );
};
