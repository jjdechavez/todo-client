import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTextTodo } from '../../actions/todosAction';

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
    width: 800
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  addBtn: {
    padding: '1em 3em'
  }
}));

const UpdateTodoForm = ({ getCurrentTodo, updateTextTodo }) => {
  const [id, setId] = useState('');
  const [editText, setEditText] = useState('');
  const classes = useStyle();

  useEffect(() => {
    if(getCurrentTodo) {
      setEditText(getCurrentTodo.text)
      setId(getCurrentTodo.id)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    updateTextTodo(id, editText);
    setEditText('');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField 
          className={classes.input} 
          variant="outlined"
          label="Update Task"
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.addBtn}
          color="primary"
        >
          Update
        </Button>
      </form>
    </>
  )
}

function mapStateToProps(state) {
  const { getCurrentTodo } = state.todos
  return {
    getCurrentTodo
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateTextTodo
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(UpdateTodoForm);