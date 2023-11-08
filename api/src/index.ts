import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
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

app.get('/todo/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const todo = await Todos.getTodo(id);

    return res.status(200).json(todo);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/todos', async (_req: Request, res: Response) => {
  try {
    const todos = await Todos.find({}).lean();

    res.status(200).json(todos);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/todo', async (req: Request, res: Response) => {
  const todoToBeCreated = req.body;
  const todo = await Todos.createTodo(todoToBeCreated);

  res.status(201).json(todo);
});

app.put('/todo/:id', async (req: Request, res: Response) => {
  const docFields = req.body;
  const { id } = req.params;

  const todo = await Todos.updateTodo(id, docFields);

  res.status(200).json(todo);
});

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todos.deleteTodo(id);

    res.status(200).send('Success');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening ${port}`));
