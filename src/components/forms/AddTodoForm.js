import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todosAction';

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

const AddTodoForm = ({addTodo}) => {
  const [text, setText] = useState('');
  const classes = useStyle();

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(text);
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
      addTodo
    },
    dispatch
  );
}

export default connect(
  null,
  matchDispatchToProps
)(AddTodoForm);