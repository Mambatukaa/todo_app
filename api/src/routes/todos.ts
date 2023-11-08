import { Router, Request, Response } from 'express';
import { Todos } from '../db/models';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const todo = await Todos.getTodo(id);

    return res.status(200).json(todo);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const todos = await Todos.find({}).lean();

    res.status(200).json(todos);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const todoToBeCreated = req.body;
  const todo = await Todos.createTodo(todoToBeCreated);

  res.status(201).json(todo);
});

router.put('/:id', async (req: Request, res: Response) => {
  const docFields = req.body;
  const { id } = req.params;

  const todo = await Todos.updateTodo(id, docFields);

  res.status(200).json(todo);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todos.deleteTodo(id);

    res.status(200).send('Success');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export default router;
