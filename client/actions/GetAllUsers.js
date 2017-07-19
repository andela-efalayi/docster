import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';


/**
 * @param {any} users
 * @returns {object} action
 */
export function getAllUsersSuccess(users) {
  return {
    type: ActionTypes.GET_ALL_USERS,
    users
  }
}

/**
 * Get all users from database
 * @returns {func} dispatch
 */
export function getAllUsers() {
  return function(dispatch) {
    return axios.get('/api/v1/users')
      .then(response => {
        const users = response.data.users;
        dispatch(getAllUsersSuccess(users));
      })
      .catch(error => {
        throw(error);
      });
  }
}