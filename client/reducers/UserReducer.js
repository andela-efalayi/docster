import ActionTypes from '../../constants/ActionTypes';
import InitialState from '../reducers/InitialState';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function UserReducer(state=InitialState.users, action) {
  const update = {};
  switch(action.type) {
    case ActionTypes.GET_ALL_USERS:
      return action.users
    case ActionTypes.UPDATE_USER_ROLE:
      update.count = state.count;    
      update.rows = [...state.rows.filter(
        user => user.id !== action.user.id),
        Object.assign({}, action.user)];
      return Object.assign({},
        ...state,
        {rows: update.rows},
        {count: update.count}
      );
    default:
      return state;
  }
}