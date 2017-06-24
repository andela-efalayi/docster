import { combineReducers } from 'redux';
import users from './UserReducer';
import auth from './AuthReducer';

// Combine all reducers
const RootReducer = combineReducers({
  auth,
  users
});

export default RootReducer;
 