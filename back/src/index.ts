import express from 'express';

const app = express();
const port = 2999;

app.get('/', (req, res) => {
  res.send('Привет, друг!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
