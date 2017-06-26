import { combineReducers } from 'redux';
import users from './UserReducer';
import auth from './AuthReducer';
import documents from './DocumentReducer';

// Combine all reducers
const RootReducer = combineReducers({
  auth,
  documents,
  users
});

export default RootReducer;
 