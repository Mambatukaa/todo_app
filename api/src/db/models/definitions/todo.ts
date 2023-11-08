import { Schema } from 'mongoose';

export interface ITodo {
  title: string;
  isCompleted: boolean;
}

export interface ITodoDocument extends ITodo {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export const todoSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: new Date() },
  modifiedAt: { type: Date, default: new Date() }
});
