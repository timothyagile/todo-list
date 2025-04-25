import { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/api';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const addNewTodo = async (title) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTodo = {
        title,
        completed: false,
        userId: 1,
      };
      
      const addedTodo = await addTodo(newTodo);
      // JSONPlaceholder API doesn't actually add data, so we need to simulate adding it locally
      setTodos([{ ...addedTodo, id: Date.now() }, ...todos]);
      return true;
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodoStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return false;
      
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await updateTodo(updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
      return true;
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const editTodo = async (id, title) => {
    setIsLoading(true);
    setError(null);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return false;
      
      const updatedTodo = { ...todoToUpdate, title };
      await updateTodo(updatedTodo);
      
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, title } : todo
      ));
      return true;
    } catch (err) {
      setError('Failed to edit todo');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todos,
    isLoading,
    error,
    addNewTodo,
    toggleTodoStatus,
    editTodo,
    removeTodo
  };
};

export default useTodos;