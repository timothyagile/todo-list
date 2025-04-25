import { useState } from 'react';
import TodoItem from './TodoItem';
import EditModal from './EditModal';

function TodoList({ todos, isLoading, error, toggleTodoStatus, editTodo, removeTodo }) {
  const [todoToEdit, setTodoToEdit] = useState(null);

  const openEditModal = (todo) => {
    setTodoToEdit(todo);
  };

  const closeEditModal = () => {
    setTodoToEdit(null);
  };

  if (isLoading && todos.length === 0) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (todos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks yet. Add one above!</div>;
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleStatus={toggleTodoStatus}
            editTodo={editTodo}
            removeTodo={removeTodo}
            openEditModal={openEditModal}
          />
        ))}
      </ul>
      {todoToEdit && (
        <EditModal
          todo={todoToEdit}
          editTodo={editTodo}
          closeModal={closeEditModal}
        />
      )}
    </div>
  );
}

export default TodoList;