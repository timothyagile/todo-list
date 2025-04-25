import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';
import useTodos from './hooks/useTodo';

function App() {
  const { 
    todos, 
    isLoading, 
    error, 
    addNewTodo, 
    toggleTodoStatus, 
    editTodo, 
    removeTodo 
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Todo List App</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <TodoForm addTodo={addNewTodo} />
          
          <TodoList 
            todos={todos}
            isLoading={isLoading}
            error={error}
            toggleTodoStatus={toggleTodoStatus}
            editTodo={editTodo}
            removeTodo={removeTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;