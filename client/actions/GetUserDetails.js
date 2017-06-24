import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';


/**
 * Set user if getUserDetails is successful
 * @param {any} user 
 * @returns {object} action
 */
export function getUserDetailsSuccess(user) {
  return {
    type: ActionTypes.GET_USER_DETAILS,
    user
  }
}

/**
 * Get all users from database
 * @returns {func} dispatch
 */
export function getUserDetails() {
  return function(dispatch) {
    return axios.get('/users')
      .then(response => {
        const users = response.data;
        dispatch(getUserDetailsSuccess(users));
      })
      .catch(error => {
        throw(error);
      })
  }
}