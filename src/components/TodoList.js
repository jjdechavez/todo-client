import React, { useEffect, useContext } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  getTodos, 
  updateDoneTodo, 
  resetTodoStatus, 
} from '../actions/todosAction';
import { TodoContext } from '../context/todoContext';

import Skeleton from '@material-ui/lab/Skeleton';
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

const TodoList = ({ getTodos, todoStatus, resetTodoStatus, todos, updateDoneTodo }) => {
  const classes = useStyle();

  const {state: {}, actions: { setToUpdate, setId, setText }} = useContext(TodoContext);

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

  
  const handleUpdate = ({ id, text }) => {
    setToUpdate(true);
    setId(id);
    setText(text)
  };
  
  let container = [];
  const listLoading = () => {
    for (let i = 0; i < 3; i++) {
      container.push(
        <div key={i} className={classes.todoListContainer}>
          <Skeleton width="20%" />
          <List className={classes.root}>
            <ListItem className={classes.listItem}> 
              <Skeleton variant="rect" width={30} height={30} />
              <Skeleton variant="text" width="80%" height={40} style={{marginLeft: "1em"}} />
              <ListItemSecondaryAction>
                <Skeleton variant="rect" width={20} height={20} />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      )
    }
    return <React.Fragment>{container}</React.Fragment>
  }

  if (todoStatus.sending) {
    return listLoading()
  } else {
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
                <IconButton 
                  onClick={e => handleUpdate(todo)} 
                  style={{display: todo.done ? 'none' : ''}}
                >
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
      resetTodoStatus
    },
    dispatch
  );
}

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(TodoList);