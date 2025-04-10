import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks/hook.ts';

export const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
