import React, { useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTodos, getTodo, updateTodos, resetTodoStatus } from '../actions/todosAction';

import { 
  List,
  makeStyles,
  Typography,
  ListItem,
  ListItemText,
  Checkbox
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: '2em'
  },
  todoListContainer: {
    marginTop: '4em'
  }
}))

const TodoList = ({ getTodos, todoStatus, resetTodoStatus, todos, updateTodos }) => {
  const classes = useStyle();

  const handleChange = ({target: checkbox}, todos) => {
    console.log('todos', todos)
    updateTodos(checkbox.value, todos.done);
  }

  // const {receiveTodos, sendTodos} = todoStatus;
  // const prevTodos = usePrevious({receiveTodos, sendTodos});

  useEffect(() => {
    getTodos();

    if (todoStatus.sent) {
      resetTodoStatus();
    }  
    
    if (todoStatus.error){
      resetTodoStatus(); 
    } 
  }, []);

  if (todoStatus.sending) return <p>Loading</p>

  return (
      <div className={classes.todoListContainer}>
        <Typography
          component="span"
          variant="h6"
        >
          Task
        </Typography>
        <List className={classes.root}>
          {todos.map(todo => (
              <ListItem key={todo.id}>
                <Checkbox
                  checked={todo.done}
                  onChange={(e) => handleChange(e, todo)}
                  value={todo.id}
                />
                <ListItemText primary={todo.text} style={{textDecoration: todo.done ? 'line-through' : 'none'}} />
              </ListItem>
            ))
          }
        </List>
      </div>
  )
}

function mapStatetoProps(state) {
  const { todos, todoStatus } = state.todos;
  return {
    todos: todos || [],
    todoStatus
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTodos,
      getTodo,
      updateTodos,
      resetTodoStatus
    },
    dispatch
  );
}

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(TodoList);