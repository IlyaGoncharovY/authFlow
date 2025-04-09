import s from './HomePage.module.css';

import {useAppDispatch} from '@/store/hooks/hook.ts';
import {logout} from '@/features/login/model/authSlice.ts';

export const HomePage = () => {

  const dispatch = useAppDispatch();

  const logOutHandler = () => dispatch(logout());

  return (
    <div className={s.homePageContainer}>
      <button onClick={logOutHandler}>log out</button>
      HomePage
    </div>
  );
};
