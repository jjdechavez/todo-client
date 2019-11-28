const initialState = {
  todos: [],
  todoStatus: {
    sending: false,
    sent: false,
    error: null
  },
  addTodoStatus: {
    sending: false,
    sent: false,
    error: null
  },
  updateTodoStatus: {
    sending: false,
    sent: false,
    error: null
  },
}

export const TodosReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'GET_TODOS': {
      let status = {
        ...state.todoStatus,
        sending: true
      }
      return {...state, todoStatus: status}
    }
    case 'GET_TODOS_FAILED': {
      let status ={
        ...state.todoStatus,
        sending: false
      }
      return {...state, todoStatus: status, error: payload}
    }
    case 'GET_TODOS_FULLFILED': {
      let status = {
        ...state.todoStatus,
        sending: false,
        sent: true
      }
      return {...state, todoStatus: status, todos: payload}
    }
    case 'ADD_TODO': {
      let status = {
        ...state.addTodoStatus,
        sending: true,
      }
      return {...state, addTodoStatus: status}
    }
    case 'ADD_TODO_FAILED': {
      let status ={
        ...state.addTodoStatus,
        sending: false
      }
      return {...state, addTodoStatus: status, error: payload}
    }
    case 'ADD_TODO_FULLFILED': {
      let status = {
        ...state.addTodoStatus,
        sending: false,
        sent: true
      };

      return {
        ...state, 
        addTodoStatus: status, 
        todos: [...state.todos, payload]
      }
    }
    case 'DONE_TODO': {
      let doneTodo = {
        ...state.todos,
        todos: state.todos.filter(todo => {
          if (todo.id === payload) {
            todo.done = !todo.done
          }
          return todo;
        })
      }
      return {...state, todos: doneTodo}
    }
    case 'UPDATE_DONE': {
      let status = {
        ...state.updateTodoStatus,
        sending: true,
      }
      return {...state, updateTodoStatus: status}
    }
    case 'UPDATE_DONE_FAILED': {
      let status = {
        ...state.updateTodoStatus,
        sending: false,
      }
      return {...state, updateTodoStatus: status, error: payload}
    }
    case 'UPDATE_DONE_FULLFILED': {
      let doneTodo = {
        ...state.todos,
        todos: state.todos.filter(todo => {
          if (todo.id === payload.id) {
            todo.done = !payload.done
          }
          return todo
        })
      }
      return {
        ...state,
        todos: [...state.todos, doneTodo]
      }
    }
    default:
      return state;
  }
}