import React from 'react';
import TodoContextProvider from './context/todoContext';

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
          {/* {editing ? <UpdateTodoForm /> : <AddTodoForm />} */}
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