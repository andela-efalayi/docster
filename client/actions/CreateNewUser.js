import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import { loginUserSuccess } from '../actions/Authenticate';
import setAuthorisationToken from '../utils/SetAuthorisationToken';

/**
 * Set newUser if new user creation is successful
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
 * Send newUser details to server
 * @param {object} newUser 
 * @returns {object}new user data
 */
export function createNewUser(newUser) {
  return function(dispatch) {
    return axios.post('/users', newUser)
      .then(response => {
        const user = response.data.user;
        if (user.roleId !== 1) {
          const token = response.data.token;
          localStorage.setItem('docsterToken', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setAuthorisationToken(token);
          dispatch(loginUserSuccess(user));
        }
        // dispatch(createNewUserSuccess(user));
      })
      .catch(error => {
        throw(error);
      });
  }
}
