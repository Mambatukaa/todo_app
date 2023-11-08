import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connect } from './db/connection';
import todoRoutes from './routes/todos';

connect()
  .then(() => {
    console.log('successfully connected');
  })
  .catch(e => console.log(e));

dotenv.config();

const app = express();

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());

// mount todo api routes
app.use('/todo', todoRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening ${port}`));
