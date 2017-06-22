import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} newUser 
 * @returns {object} action
 */
export function createNewUserSuccess(newUser) {
  return {
    type: ActionTypes.CREATE_NEW_USER_SUCCESS,
    newUser
  }
}


/**
 * @param {any} newUser 
 * @returns {object}new user data
 */
export function createNewUser(newUser) {
  return function(dispatch) {
    return axios.post('/users', newUser)
      .then(user => {
        dispatch(createNewUserSuccess, user)
      })
      .catch(error => {
        throw(error);
      })
  }
}
