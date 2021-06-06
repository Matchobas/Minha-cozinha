import express from 'express';

const app = express();

app.use(express.json);

app.listen(3333, () => {
  console.log('🍲️ Conected to port 3333');
});