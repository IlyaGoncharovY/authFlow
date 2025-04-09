import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

import {AuthRequestBody, JwtPayload, RefreshRequestBody} from './types/authTypes';

import {createUser, findUser, validatePassword, generateTokens, logUserAction} from '@/libs';

//const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

export const registerUser: RequestHandler<{}, any, AuthRequestBody> = async (req, res) => {
  const { username, password } = req.body;

  const existing = await findUser(username);
  if (existing) {
    res.status(400).json({ message: 'Пользователь уже существует' });
    return;
  }

  await createUser(username, password);

  const { token, refreshToken } = generateTokens(username);
  logUserAction('register', username, token);

  res.json({ token, refreshToken, username });
};

export const loginUser = (
  options: { useCookie: boolean } = { useCookie: false },
): RequestHandler<{}, any, AuthRequestBody> => {
  return async (req, res) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (!user || !(await validatePassword(user.password, password))) {
      res.status(401).json({ message: 'Неверные учетные данные' });
      return;
    }

    const { token, refreshToken } = generateTokens(username);
    logUserAction('login', username, token);

    if (options.useCookie) {
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: 'Авторизация прошла успешно (cookie)' });
      return;
    }

    res.json({ token, refreshToken, username });
  };
};

export const logout: RequestHandler = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  console.log('🚪 Пользователь вышел из системы');

  res.json({ message: 'Выход выполнен, куки удалены' });
};

export const refreshToken: RequestHandler<{}, any, RefreshRequestBody> = (req, res) => {
  let tokenFromRequest = req.body.refreshToken;

  if (!tokenFromRequest && req.cookies?.refreshToken) {
    tokenFromRequest = req.cookies.refreshToken;
  }

  if (!tokenFromRequest) {
    res.status(401).json({ message: 'Refresh-токен не предоставлен' });
    return;
  }

  jwt.verify(tokenFromRequest, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({ message: 'Неверный refresh-токен' });
      return;
    }

    const { username } = decoded as JwtPayload;
    const { token } = generateTokens(username);

    if (req.cookies?.refreshToken) {
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.json({ message: 'Access-токен обновлён', token });
      return;
    }

    res.json({ token });
  });
};
