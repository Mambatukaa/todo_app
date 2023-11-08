import { deleteTodo, updateTodo } from '../utils/handleApi';
import { useState } from 'react';

const TaskList = ({ list, setList }: { list: any[]; setList: any }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleSave = (isCompleted: boolean) => {
    updateTodo(editId || '', { title: editText, isCompleted }, setList);
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="w-full text-center flex flex-col gap-2">
      {list.map(({ _id, title, isCompleted }) => (
        <li
          key={_id}
          className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-md"
        >
          {editId === _id ? (
            <div className="w-full">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />

              <div className="flex gap-3 mt-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleSave(isCompleted)}
                >
                  Save
                </button>
                <button
                  className="text-red-500"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <span
              className={`${
                isCompleted ? 'line-through text-gray-500' : 'text-black'
              }`}
            >
              {title}
            </span>
          )}

          {!editId && (
            <div>
              <button
                className={`text-${isCompleted ? 'green' : 'gray'}-500`}
                onClick={() =>
                  updateTodo(_id, { title, isCompleted: !isCompleted }, setList)
                }
              >
                {isCompleted ? 'Uncheck' : 'Check'}
              </button>
              <button
                className="text-blue-500 ml-2"
                onClick={() => setEditId(_id)}
              >
                Edit
              </button>
              <button
                className="text-red-500 ml-2"
                onClick={() => deleteTodo(_id, setList)}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </div>
  );
};

export default TaskList;
