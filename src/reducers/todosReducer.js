const initialState = {
  todos: [],
  getTodo: {},
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
    case 'GET_TODOS_FULLFILED': {
      let status = {
        ...state.todoStatus,
        sending: false,
        sent: true
      }
      return {...state, todoStatus: status, todos: payload}
    }
    case 'GET_TODOS_FAILED': {
      let status ={
        ...state.todoStatus,
        sending: false
      }
      return {...state, todoStatus: status, error: payload}
    }
    case 'RESET_TODO_STATUS': {
      let status = {
        ...state.todoStatus,
        sending: false,
        sent: false,
        error: null
      }
      return {...state, todoStatus: status}
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
        todos: [payload, ...state.todos]
      }
    }
    case 'GET_TODO': {
      let todo = {
        id: payload.id,
        text: payload.text,
        done: payload.done
      }
      
      return {
        ...state,
        getTodo: todo
      }
    }
    case 'DONE_TODO': {
      let doneTodo = state.todos.map(todo => {
        if (todo.id === payload.id) {
          todo.done = !todo.done
        }
        return todo;
      })

      return {...state, todos: [...state.todos, doneTodo]}
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
      let todos = [...state.todos];

        for(let todo of todos) {
          if(todo.id === payload.id) {
            todo.done = !todo.done;
            console.log('loop todo', todo);
          }
        };

        console.log('resp', todos);
      return {
        ...state,
        todos
      }
    }
    default:
      return state;
  }
}