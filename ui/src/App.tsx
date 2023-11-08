import './App.css';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { createTodo } from './utils/handleApi';
import { getAllTodo } from './utils/handleApi';

function App() {
  //state to manage input field
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllTodo(setList);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-8">
      <div className="flex justify-center items-center gap-6">
        <input
          className="w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          placeholder="Enter a new task"
        />
        <button
          className="h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
          onClick={() =>
            //execute function to add new todo to the list
            createTodo(
              {
                title,
                complete: false
              },
              setList
            )
          }
        >
          Add Todo Item
        </button>
      </div>

      <TaskList list={list} setList={setList} />
    </div>
  );
}
export default App;
