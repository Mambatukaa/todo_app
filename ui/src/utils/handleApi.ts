import axios from 'axios';
import { ITodo } from '../types';

const basUrl = 'http://localhost:8000';

export const getAllTodo = (setList: any) => {
  axios
    .get(`${basUrl}/todos`)
    .then(({ data }) => {
      setList(data);
    })
    .catch(e => {
      console.log(e);
    });
};

export const createTodo = (docFields: ITodo, setList: any) => {
  axios
    .post(`${basUrl}/todo`, docFields)
    .then(data => {
      getAllTodo(setList);
    })
    .catch(e => {
      console.log(e);
    });
};

export const updateTodo = (id: string, docFields: ITodo, setList: any) => {
  axios
    .put(`${basUrl}/todo/${id}`, docFields)
    .then(({ data }) => {
      setList(data);
    })
    .catch(e => {
      console.log(e);
    });
};

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
