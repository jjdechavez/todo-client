const initialState = {
  todos: [],
  getCurrentTodo: {},
  editing: false,
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
  getCurrentTodoStatus: {
    sending: false,
    sent: false,
    error: null
  },
  updateDoneTodoStatus: {
    sending: false,
    sent: false,
    error: null
  },
  updateTextTodoStatus: {
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
    case 'ADD_TODO_FAILED': {
      let status ={
        ...state.addTodoStatus,
        sending: false
      }
      return {...state, addTodoStatus: status, error: payload}
    }
    case 'RESET_ADD_TODO_STATUS': {
      let status = {
        ...state.addTodoStatus,
        sending: false,
        sent: false,
        error: null
      }
      return { ...state, addTodoStatus: status }
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
      let todos = [...state.todos];
      let status = {
        ...state.updateDoneTodoStatus,
        sending: true,
      }

      for(let todo of todos) {
        if(todo.id === payload) {
          todo.done = !todo.done;
        }
      };

      return {
        ...state, 
        todos,
        updateDoneTodoStatus: status
      }
    }
    case 'UPDATE_DONE_FULLFILED': {
      let status = {
        ...state.updateDoneTodoStatus,
        sending: false,
        sent: true
      }

      return {
        ...state,
        updateDoneTodoStatus: status
      }
    }
    case 'UPDATE_DONE_FAILED': {
      let status = {
        ...state.updateDoneTodoStatus,
        sending: false,
      }
      return {...state, updateDoneTodoStatus: status, error: payload}
    }
    case 'RESET_UPDATE_DONE_TODO_STATUS': {
      let status = {
        ...state.updateDoneTodoStatus,
        sending: false,
        sent: false,
        error: null
      }
      return { ...state, updateDoneTodoStatus: status }
    }
    case 'UPDATE_TEXT': {
      let status = {
        ...state.updateTextTodoStatus,
        sending: true,
      }

      return { ...state, updateTextTodoStatus: status }
    }
    case 'UPDATE_TEXT_TODO_FULLFILED': {
      let status = {
        ...state.updateTextTodoStatus,
        sending: false,
        sent: true
      }

      let getCurrentTodo= {
        id: null,
        text: '',
        done: null
      }

      const updateTodo = state.todos.map(todo => {
        if (todo.id === payload.id) {
          todo.text = payload.text
        }
        return todo;
      })

      return {
        ...state,
        updateTextTodoStatus: status,
        todos: updateTodo,
        getCurrentTodo
      }
    }
    case 'UPDATE_TEXT_TODO_FAILED': {
      let status = {
        ...state.updateTextTodoStatus,
        sending: false,
      }
      let getCurrentTodoStatus = {
        id: null,
        text: '',
        done: null
      }
      return {
        ...state, 
        updateDoneTodoStatus: status, 
        getCurrentTodoStatus,
        editing: false,
      }
    }
    case 'RESET_UPDATE_TEXT_TODO_STATUS': {
      let status = {
        ...state.updateTextTodoStatus,
        sending: false,
        sent: false,
        error: null
      }
      return { 
        ...state, 
        updateTextTodoStatus: status,
        editing: false
      }
    }
    default:
      return state;
  }
}