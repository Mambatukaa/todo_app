import { Model, model } from 'mongoose';
import { ITodo, ITodoDocument, todoSchema } from './definitions/todo';

export interface ITodoModel extends Model<ITodoDocument> {
  createTodo(docFields: ITodo): Promise<ITodoDocument>;
  getTodo(_id: string): Promise<ITodoDocument>;
  updateTodo(_id: string, docFields: ITodo): Promise<ITodoDocument>;
  deleteTodo(_id: string): Promise<any>;
}

const loadClass = () => {
  class Todo {
    public static async createTodo(docFields: ITodo) {
      const todo = await Todos.create({ ...docFields, isChecked: false });

      return Todos.findOne({ _id: todo._id });
    }

    public static async getTodo(_id: string) {
      const todo = await Todos.findOne({ _id });

      if (!todo) {
        throw new Error('Todo not found!');
      }

      return todo;
    }

    public static async updateTodo(_id: string, docFields: ITodo) {
      await Todos.updateOne({ _id }, { $set: docFields });

      return Todos.getTodo(_id);
    }

    public static async deleteTodo(_id: string) {
      const todo = await Todos.findOne({ _id });

      if (!todo) {
        throw new Error('Todo not found!');
      }

      return Todos.deleteOne({ _id });
    }
  }

  todoSchema.loadClass(Todo);

  return todoSchema;
};

loadClass();

const Todos = model<ITodoDocument, ITodoModel>('todos', todoSchema);

export default Todos;
