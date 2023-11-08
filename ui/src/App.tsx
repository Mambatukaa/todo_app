import React, { useState, useEffect } from 'react';
import { createTodo, getAllTodo } from './utils/handleApi';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [list, setList] = useState<
    { _id: string; title: string; isCompleted: boolean }[]
  >([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    getAllTodo(setList);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-l"
          placeholder="Add a new task"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={() => {
            createTodo({ title, isCompleted: false }, setList);

            // clear input
            setTitle('');
          }}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        <TaskList list={list} setList={setList} />
      </ul>
    </div>
  );
};

export default App;
