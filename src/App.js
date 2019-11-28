import React from 'react';

import Navbar from './components/Navbar';
import AddTodoForm from './components/forms/AddTodoForm';
import TodoList from './components/TodoList';

import {
  Container,
} from '@material-ui/core';

function App() {

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Navbar />
        <Container maxWidth="md">
          <AddTodoForm />
          <TodoList />
        </Container>
      </Container>
    </div>
  );
}

export default App;