import { combineReducers } from 'redux';
import users from './UserReducer';

const RootReducer = combineReducers({
  users
});

export default RootReducer;
 