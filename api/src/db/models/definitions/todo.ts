import { Schema } from 'mongoose';

export interface ITodo {
  title: string;
  complete: boolean;
}

export interface ITodoDocument extends ITodo {
  _id: string;
}

export const todoSchema = new Schema({
  title: { type: String, required: true },
  complete: { type: Boolean, required: true }
});
