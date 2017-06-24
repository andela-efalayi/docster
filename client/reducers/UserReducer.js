import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function UserReducer(state=[], action) {
  switch(action.type) {
    case ActionTypes.CREATE_NEW_USER_SUCCESS:
      return action.newUser
    case ActionTypes.GET_USER_DETAILS:
      return action.user
    default:
      return state;
  }
}