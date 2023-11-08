import { Router, Request, Response } from 'express';
import { Todos } from '../db/models';

const router = Router();

// handle erros
const handleErrors = (res: Response, error: Error) => {
  res.status(500).send(error.message);
};

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const todo = await Todos.getTodo(id);

    return res.status(200).json(todo);
  } catch (e) {
    handleErrors(res, e as Error);
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const todos = await Todos.find({}).lean();

    res.status(200).json(todos);
  } catch (e) {
    handleErrors(res, e as Error);
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

  try {
    const todo = await Todos.updateTodo(id, docFields);

    res.status(200).json(todo);
  } catch (e) {
    handleErrors(res, e as Error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Todos.deleteTodo(id);

    res.status(200).send('Success');
  } catch (e: any) {
    handleErrors(res, e as Error);
  }
});

export default router;
