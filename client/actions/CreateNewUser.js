import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import { loginUserSuccess } from '../actions/Authenticate';
import setAuthorisationToken from '../utils/SetAuthorisationToken';
import getServerError from '../utils/GetServerError';
import decodeToken from '../utils/DecodeToken';

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
    return axios.post('/api/v1/users', newUser)
      .then(response => {
        const token = response.data.token;
        const user = decodeToken(token);        
        localStorage.setItem('docsterToken', token);
        setAuthorisationToken(token);
        dispatch(loginUserSuccess(user));
      })
      .catch(error => {
        const serverError = getServerError(error)
        throw(serverError.data.message);
      });
  }
}
