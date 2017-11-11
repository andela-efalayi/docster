import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

/**
 * @param {object} users
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
 * @param {number} offset
 * @returns {func} dispatch
 */
export function getAllUsers(offset) {
  return function(dispatch) {
    return axios.get('/api/v1/users', {
      params: {
        offset
      }
    })
      .then(response => {
        const users = response.data.users;
        dispatch(getAllUsersSuccess(users));
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}