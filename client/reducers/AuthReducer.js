import isEmpty from 'lodash/isEmpty';
import ActionTypes from '../../constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  userDetails: {}
}

/**
 * @param {object} state 
 * @param {object} action 
 * @returns {object} state
 */
export default function AuthReducer(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return { 
        isAuthenticated: !isEmpty(action.currentUser),
        currentUser: action.currentUser
      }
    default:
      return state;
  }
}