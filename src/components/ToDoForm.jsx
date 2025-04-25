import { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    const success = await addTodo(title);
    if (success) {
      setTitle('');
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Add Task
        </button>
      </div>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </form>
  );
}

export default TodoForm;