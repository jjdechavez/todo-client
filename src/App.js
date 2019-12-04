import React from 'react';
import TodoContextProvider from './context/todoContext';

import Navbar from './components/Navbar';
import AddTodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import {
  Container,
} from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Navbar />
        <Container maxWidth="md">
          <TodoContextProvider>
            <AddTodoForm/>
            <TodoList/>
          </TodoContextProvider>
        </Container>
      </Container>
    </div>
  );
}

export default App;