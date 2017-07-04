import { combineReducers } from 'redux';
import users from './UserReducer';
import auth from './AuthReducer';
import documents from './DocumentReducer';
import roles from './RoleReducer';
import search from './SearchReducer';

// Combine all reducers
const RootReducer = combineReducers({
  auth,
  documents,
  roles,
  users,
  search
});

export default RootReducer;
 