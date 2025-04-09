import {ChangeEvent, FC, FormEvent, useState} from 'react';

import {selectModeLSOrCookieType} from 'shared/types';

import s from './FormLogin.module.css';


interface IAuthForm {
    onSubmit: (username: string, password: string, mode: selectModeLSOrCookieType) => void;
    buttonLabel: string;
    showModeToggle?: boolean;
}

/**
 * Универсальная форма для авторизации и регистрации пользователей.
 *
 * Позволяет вводить имя пользователя и пароль, с возможностью выбора режима хранения токена (local или cookie).
 * Используется в компонентах `LoginForm` и `RegisterForm`.
 *
 *  @param {IAuthForm} props - props для AuthForm
 *
 * @param {function} props.onSubmit - Функция обратного вызова, вызываемая при отправке формы.
 * Принимает параметры: `username`, `password`, `mode`.
 *
 * @param {string} props.buttonLabel - Текст кнопки отправки формы (например, "Войти" или "Зарегистрироваться").
 *
 * @param {boolean} [props.showModeToggle=false] - Показывать ли выпадающий список выбора режима авторизации
 * (local | cookie).
 * По умолчанию скрыт (используется только для логина).
 *
 * @example
 * <AuthForm
 *   onSubmit={(username, password, mode) => dispatch(loginUser(username, password, mode))}
 *   buttonLabel="Войти"
 *   showModeToggle
 * />
 */
export const AuthForm: FC<IAuthForm> = ({ onSubmit, buttonLabel, showModeToggle = false }: IAuthForm) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<selectModeLSOrCookieType>('local');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, mode);
    setUsername('');
    setPassword('');
  };

  const onChangeSetUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangeSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeSetMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.currentTarget.value as selectModeLSOrCookieType);
  };

  return (
    <div className={s.loginFormContainer}>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={onChangeSetUserName}
          placeholder='Имя пользователя'
        />
        <input
          type="password"
          value={password}
          onChange={onChangeSetPassword}
          placeholder='Пароль'
        />
        {showModeToggle && (
          <select value={mode} onChange={onChangeSetMode}>
            <option value='local'>localStorage</option>
            <option value='cookie'>Cookie</option>
          </select>
        )}
        <button type='submit'>{buttonLabel}</button>
      </form>
    </div>
  );
};
