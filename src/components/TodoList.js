import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  getTodos, 
  updateDoneTodo, 
  getCurrentTodo,
  resetTodoStatus, 
} from '../actions/todosAction';

import EditIcon from '@material-ui/icons/Edit';

import { 
  List,
  makeStyles,
  Typography,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '2em'
  },
  todoListContainer: {
    marginTop: '4em'
  },
  listItem: {
    flexGrow: 1
  }
}))

const TodoList = ({ getTodos, todoStatus, resetTodoStatus, todos, updateDoneTodo, getCurrentTodo }) => {
  const classes = useStyle();

  const handleChange = ({target: checkbox}, todos) => {
    updateDoneTodo(checkbox.value, todos.done);
  }

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
              <ListItem key={todo.id} className={classes.listItem}>
                <Checkbox
                  checked={todo.done}
                  onChange={(e) => handleChange(e, todo)}
                  value={todo.id}
                />
                <ListItemText primary={todo.text} style={{textDecoration: todo.done ? 'line-through' : 'none'}} />
                <ListItemSecondaryAction>
                  <IconButton onClick={e => getCurrentTodo(todo)}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
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
      updateDoneTodo,
      getCurrentTodo,
      resetTodoStatus
    },
    dispatch
  );
}

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(TodoList);