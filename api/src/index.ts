import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors);

app.use('/', (_req, res) => {
  res.json('hello world');
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening ${port}`));
