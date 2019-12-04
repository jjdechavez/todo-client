import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const client = new Lokka({
  transport: new Transport('/api/graphql')
});

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

export const addTodo = text => async dispatch => {
  dispatch({ type: 'ADD_TODO' });
  const mutationQuery = `
   ($text: String!){
      newTodo(text: $text) {
        id
        text
        done
      }
    }
  `
  const vars = {
    text
  }
  try {
    const res = await client.mutate(mutationQuery, vars);
    dispatch({ type: 'ADD_TODO_FULLFILED', payload: res.newTodo });
    dispatch({ type: 'RESET_ADD_TODO_STATUS' })
  } catch (error) {
    dispatch({ type: 'ADD_TODO_FAILED', payload: error })
  }
}

export const resetAddTodoStatus = () => async dispatch => {
  dispatch({ type: 'RESET_ADD_TODO_STATUS' })
}

export const updateDoneTodo = (id, done) => async dispatch => {
  dispatch({ type: 'UPDATE_DONE' });
  const mutationQuery = `
    ($id: ID!, $done: Boolean) {
      doneTodo(id: $id, done: $done) {
        id
        text
        done
      }
    } 
  `;
  const vars = {
    id, done
  };
  try {
   let resp = await client.mutate(mutationQuery, vars);
   dispatch({type: 'UPDATE_DONE_FULLFILED', payload: resp.doneTodo});
   dispatch({ type: 'RESET_UPDATE_DONE_TODO_STATUS' });
  } catch (error) {
    dispatch({ type: 'UPDATE_DONE_FAILED', payload: error });
  }
}

export const resetUpdateTodoStatus = () => async dispatch => {
  dispatch({ type: 'RESET_UPDATE_DONE_TODO_STATUS' })
}

export const getCurrentTodo = todos => async dispatch => {
  dispatch({ type: 'GET_CURRENT_TODO' });
  try {
    dispatch({ type: 'GET_CURRENT_TODO_FULLFILED', payload: todos });
    dispatch({ type: 'GET_CURRENT_TODO_RESET' });
  } catch (error) {
    dispatch({ type: 'GET_CURRENT_TODO_FAILED', payload: error });
  }
}

export const updateTextTodo = (id, text) => async dispatch => {
  dispatch({ type: 'UPDATE_TEXT' });
  const mutationQuery = `
    ($id: ID!, $text: String!) {
      updateText(
        id: $id,
        text: $text
      ){
        id
        text
      }
    }
  `
  const vars = {
    id, text
  }
  try {
    let res = await client.mutate(mutationQuery, vars);
    dispatch({ type: 'UPDATE_TEXT_TODO_FULLFILED', payload: res.updateText });
    dispatch({ type: 'RESET_UPDATE_TEXT_TODO_STATUS' });
  } catch (error) {
    dispatch({ type: 'UPDATE_TEXT_TODO_FAILED', payload: error })
  }
}