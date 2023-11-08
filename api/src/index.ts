import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { connect } from './db/connection';
import Todos from './db/models/Todo';

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


app.get('/todos', async (_req, res) => {
  const todos = await Todos.find({}).lean();

  res.status(200).json(todos);
});

app.post('/createTodo', async (req, res) => {
  const todoToBeCreated = req.body;

  const todo = await Todos.create(todoToBeCreated);

  res.status(201).json(todo);
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening ${port}`));
