import axios from 'axios';
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const url = 'http://localhost:3001/todos/';
const client = new Lokka({
  transport: new Transport('/api/graphql')
})

export const getTodos = () => async dispatch => {
  dispatch({ type: 'GET_TODOS' });
  const mutationQuery = `
    {
      todos {
        id
        text
        done
      }
    }
  `;
  try {
    const res = await client.query(mutationQuery);
    dispatch({ type: 'GET_TODOS_FULLFILED', payload: res.todos });
    dispatch({ type: 'RESET_TODO_STATUS' });
  } catch (error) {
    dispatch({ type: 'GET_TODOS_FAILED', payload: error });
  }
}

export const resetTodoStatus = () => async dispatch => {
  dispatch({ type: 'RESET_TODO_STATUS' })
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

export const getTodo = id => async dispatch => {
  try {
    const getTodo = await axios.get(url + id);
    dispatch({ type: 'GET_TODO', payload: getTodo.data});
    if(getTodo.data) {
      // getTodo.data.done = !getTodo.data.done;
      console.log('todo data', getTodo.data.done)
      const doneTodo = await axios.patch(url + getTodo.data.id);
      dispatch({ type: 'DONE_TODO', payload: doneTodo.data })
    }
  } catch (error) {
    dispatch({ type: 'DONE_TODO_ERROR', payload: error })
  }
}

export const updateTodos = todos => async dispatch => {
  dispatch({ type: 'UPDATE_DONE' });
  try {
   let resp = await axios.get(url + todos);
    if (resp.data) {
        resp.data.done = !resp.data.done;
      const res = await axios.put(`${url}${todos}`, resp.data);
      dispatch({ type: 'UPDATE_DONE_FULLFILED', payload: res.data });
    }
  } catch (error) {
    console.log('error', error)
    dispatch({ type: 'UPDATE_DONE_FAILED', payload: error });
  }
}