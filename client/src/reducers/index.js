import { combineReducers } from 'redux';
import {TodosReducer} from './todosReducer';


const allReducer = combineReducers({
  todos: TodosReducer
});

export default allReducer;