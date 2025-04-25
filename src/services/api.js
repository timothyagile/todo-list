export const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };
  
  export const addTodo = async (todo) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };
  
  export const updateTodo = async (todo) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };
  
  export const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };