import { useState } from 'react';

function TodoItem({ todo, toggleStatus, editTodo, removeTodo, openEditModal }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    toggleStatus(todo.id);
  };

  const handleEdit = () => {
    openEditModal(todo);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await removeTodo(todo.id);
    setIsDeleting(false);
  };

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-3 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 text-blue-500 mr-3"
        />
        <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'} flex-grow`}>
          {todo.title}
        </span>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;