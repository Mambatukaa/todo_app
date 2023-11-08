import axios from 'axios';
import { ITodo } from '../types';

const basUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// get all todo list from the server
export const getAllTodo = (setList: any) => {
  axios
    .get(`${basUrl}/todo`)
    .then(({ data }) => {
      setList(data);
    })
    .catch(e => {
      console.log(e);
    });
};

// create new todo
export const createTodo = (docFields: ITodo, setList: any) => {
  axios
    .post(`${basUrl}/todo`, docFields)
    .then(() => {
      getAllTodo(setList);
    })
    .catch(e => {
      console.log(e);
    });
};

// update todo
export const updateTodo = (id: string, docFields: ITodo, setList: any) => {
  axios
    .put(`${basUrl}/todo/${id}`, docFields)
    .then(() => {
      getAllTodo(setList);
    })
    .catch(e => {
      console.log(e);
    });
};

// delete todo
export const deleteTodo = (id: string, setList: any) => {
  axios
    .delete(`${basUrl}/todo/${id}`)
    .then(() => {
      getAllTodo(setList);
    })
    .catch(e => {
      console.log(e);
    });
};
