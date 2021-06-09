import express from 'express';

import routes from './routes';
import './typeORM';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🍲️ Conected to port 3333');
});