import React, {useState, createContext} from 'react';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [text, setText] = useState('');
  const [toUpdate, setToUpdate] = useState(false);
  const [id, setId] = useState('');

  const value = {
    state: {
      text,
      toUpdate,
      id
    },
    actions: {
      setText,
      setToUpdate,
      setId
    }
  }
  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider;