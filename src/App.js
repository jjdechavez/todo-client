import React from 'react';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import AddTodoForm from './components/forms/AddTodoForm';
import TodoList from './components/TodoList';

import {
  Container,
} from '@material-ui/core';
import UpdateTodoForm from './components/forms/UpdateTodoForm';

function App({ editing }) {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Navbar />
        <Container maxWidth="md">
          {editing ? <UpdateTodoForm /> : <AddTodoForm />}
          <TodoList />
        </Container>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  const { editing } = state.todos;
  return {
    editing
  }
}

export default connect(mapStateToProps)(App);