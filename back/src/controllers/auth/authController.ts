import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

import {AuthRequestBody, JwtPayload, RefreshRequestBody} from './types/authTypes';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

export const loginLocal: RequestHandler<{}, any, AuthRequestBody> = (req, res): void => {
  const { username, password } = req.body;
  if (username && password) {
    const token = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    const tokenParts = token.split('.');
    console.log('JWT Token Parts:');
    console.log('Header:', tokenParts[0]);
    console.log('Payload:', tokenParts[1]);
    console.log('Signature:', tokenParts[2]);

    res.json({ token, refreshToken });
    return;
  }
  res.status(401).json({ message: 'Неверные учетные данные' });
};

export const loginCookie: RequestHandler<{}, any, AuthRequestBody> = (req, res): void => {
  const { username, password } = req.body;
  if (username && password) {
    const token = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken,
      { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: 'Авторизация прошла успешно, токены установлены в куки' });
    return;
  }
  res.status(401).json({ message: 'Неверные учетные данные' });
};

export const refreshToken: RequestHandler<{}, any, RefreshRequestBody> = (req, res): void => {
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
    const payload = decoded as JwtPayload;
    const newToken = jwt.sign({ username: payload.username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    if (req.cookies?.refreshToken) {
      res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 15 * 60 * 1000 });
      res.json({ message: 'Access-токен обновлён', token: newToken });
      return;
    }
    res.json({ token: newToken });
  });
};

export const registerUser: RequestHandler<{}, any, AuthRequestBody> = (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.json({ token, refreshToken, username });
};
