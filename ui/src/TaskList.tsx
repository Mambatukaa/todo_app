import { deleteTodo } from './utils/handleApi';

const TaskList = ({ list, setList }: { list: any[]; setList: any }) => {
  return (
    <div className="w-full text-center flex items-center flex-col gap-5">
      <h1 className="text-blue-600 uppercase font-semibold text-2xl">
        Task List
      </h1>

      {list.map((item: any) => (
        <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
          <div className="flex justify-between items-center mb-5">
            <li className="list-none w-2/3 text-left break-normal">
              {item.title}
              {item._id}
            </li>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-2 py-2 font-medium rounded-md">
                Completed
              </button>
              <button
                className="bg-white text-blue-600 px-2 py-2 font-medium rounded-md"
                onClick={() => {
                  deleteTodo(item._id, setList);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TaskList;
