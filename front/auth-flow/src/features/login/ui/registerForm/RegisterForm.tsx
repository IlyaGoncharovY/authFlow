import {ChangeEvent, FormEvent, useState} from 'react';

import {registerUser} from '../../model/thunk/registerUser.ts';

import {useAppDispatch} from '@/store/hooks/hook.ts';
import {FormLogin} from '@/shared/components';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser( username, password));
    setUsername('');
    setPassword('');
  };

  const onChangeSetUserNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangeSetPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <>
      <FormLogin
        handleRegister={handleRegister}
        username={username}
        onChangeSetUserNameHandler={onChangeSetUserNameHandler}
        placeHolderUserNameInput={'Имя пользователя'}
        password={password}
        onChangeSetPasswordHandler={onChangeSetPasswordHandler}
        placeHolderPasswordInput={'Пароль'}
        submitButtonTitle={'Зарегистрироваться'}
      />
    </>
  );
};
