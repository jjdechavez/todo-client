import axios from 'axios';

const url = 'http://localhost:3001/todos';

export const getTodos = () => async dispatch => {
  dispatch({ type: 'GET_TODOS' });
  try {
    const res = await axios.get(url);
    dispatch({ type: 'GET_TODOS_FULLFILED', payload: res.data });
  } catch (error) {
    dispatch({ type: 'GET_TODOS_FAILED', payload: error });
  }
}

export const addTodo = (text, done=false) => async dispatch => {
  dispatch({ type: 'ADD_TODO' });
  try {
    const res = await axios.post(url, { text, done });
    dispatch({ type: 'ADD_TODO_FULLFILED', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_TODO_FAILED', payload: error })
  }
}

export const checkTodos = id => dispatch => {
  dispatch({ type: 'DONE_TODO', payload: id});
}

export const updateTodos = todos => async dispatch => {
  dispatch({ type: 'UPDATE_DONE' });
  try {
    const res = await axios.put(`${url}/${todos.id}`, todos);
    dispatch({ type: 'UPDATE_DONE_FULLFILED', payload: res.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_DONE_FAILED', payload: error });
  }
}