import ActionTypes from '../../constants/ActionTypes';
import InitialState from '../reducers/InitialState';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function UserReducer(state=InitialState.users, action) {
  switch(action.type) {
    case ActionTypes.GET_ALL_USERS:
      return action.users
    default:
      return state;
  }
}