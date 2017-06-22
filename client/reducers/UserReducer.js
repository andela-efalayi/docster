import ActionTypes from '../../constants/ActionTypes';

/**
 * UserReducer createsa deep copy of the newUser parsed in
 * @param {array} [state=[]] 
 * @param {object} action 
 * @returns {array} state
 */
export default function UserReducer(state=[], action) {
  switch(action.type) {
    case ActionTypes.CREATE_NEW_USER_SUCCESS:
      return action.newUser
    default:
      return state;
  }
}