import {Route, Routes} from 'react-router-dom';

import {PrivateRoute} from '../providers/PrivateRoute.tsx';

import {HomePage} from '@/pages/homePage';
import {LoginPage} from '@/pages/loginPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
