import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTodos, checkTodos, updateTodos } from '../actions/todosAction';

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

const TodoList = ({ getTodos, checkTodos, todos, updateTodos }) => {
  const classes = useStyle();

  const handleChange = ({target: checkbox}, todos) => {
    console.log('handle changes', todos);
    updateTodos(checkbox.value);
  }

  useEffect(() => {
    getTodos()
  }, [])

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
  const { todos } = state.todos;
  return {
    todos
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTodos,
      checkTodos,
      updateTodos
    },
    dispatch
  );
}

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(TodoList);