import React, { useContext } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, updateTextTodo, } from '../actions/todosAction';
import { TodoContext } from '../context/todoContext';

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
  const {state: {text, toUpdate, id}, actions: {setToUpdate, setId, setText}} = useContext(TodoContext);
  const handleSubmit = e => {
    e.preventDefault();
    toUpdate ? updateTextTodo(id, text) : addTodo(text)
    setText('');
    setId('');
    setToUpdate(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField 
          className={classes.input} 
          variant="outlined"
          label={toUpdate ? "Change Todo" : "Add Todo"}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.addBtn}
          color="primary"
          disabled={text ? false : true}
        >
          {toUpdate ? 'Save' : 'Add'}
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