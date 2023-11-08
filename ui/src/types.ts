export interface ITodo {
  title: string;
  isCompleted: boolean;
}

export interface ITodoDocument extends ITodo {
  _id: string;
}
