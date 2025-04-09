import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 2999;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Привет, друг!!!!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
