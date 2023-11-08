import { Schema } from 'mongoose';

export interface ITodo {
  isChecked: boolean;
  title: string;
}

export interface ITodoDocument extends ITodo {
  _id: string;
}

export const todoSchema = new Schema({
  title: { type: String, required: true }
});
