import ActionTypes from '../../constants/ActionTypes';
import InitialState from '../reducers/InitialState';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function RoleReducer(state=InitialState.roles, action) {
  switch(action.type) {
    case ActionTypes.GET_ALL_ROLES:
      return action.roles
    default:
      return state;
  }
}