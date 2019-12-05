import React, {useState, createContext} from 'react';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [text, setText] = useState('');
  const [toUpdate, setToUpdate] = useState(false);
  const [id, setId] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const value = {
    state: {
      text,
      toUpdate,
      id,
      isExpanded,
    },
    actions: {
      setText,
      setToUpdate,
      setId,
      setIsExpanded,
    }
  }
  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider;