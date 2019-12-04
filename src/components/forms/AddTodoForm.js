import React, { useContext } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, updateTextTodo, } from '../../actions/todosAction';
import { TodoContext } from './../../context/todoContext';

import { 
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '3em',
    width: 900
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  addBtn: {
    padding: '1em 3em'
  }
}));
const AddTodoForm = ({ addTodo, updateTextTodo }) => {
  const classes = useStyle();
  const {state: {text, toUpdate, id}, actions: {setToUpdate, setText}} = useContext(TodoContext);

  const handleSubmit = e => {
    e.preventDefault();
    toUpdate ? updateTextTodo(id, text) : addTodo(text)
    setText('');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField 
          className={classes.input} 
          variant="outlined"
          label="New Task"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.addBtn}
          color="primary"
        >
          Add
        </Button>
      </form>
    </>
  )
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTodo,
      updateTextTodo
    },
    dispatch
  );
}

export default connect(
  null,
  matchDispatchToProps
)(AddTodoForm);