import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import setAuthorisationToken from '../utils/SetAuthorisationToken';

/**
 * Set currentUser if login is successful
 * @param {object} currentUser 
 * @returns {object} actionType
 */
export function loginUserSuccess(currentUser) {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    currentUser
  }
}

/**
 * Send user details to the server for verification
 * @param {object} userCredentials 
 * @returns {func} action
 */
export function loginUser(userCredentials) {
  return function(dispatch) {
    return axios.post('/users/login', userCredentials)
      .then(response => {
        const token = response.data.token;
        const currentUser = response.data.user;
        localStorage.setItem('docsterToken', token);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setAuthorisationToken(token);
        dispatch(loginUserSuccess(currentUser));        
      })
      .catch(error => {
        throw(error);
      });
  }
}


/**
 * Log user out of app [ clear localStorage and removes authorisation token ]
 * @returns {func} dispatch
 */
export function logoutUser() {
  return function(dispatch) {
    localStorage.removeItem('docsterToken');
    localStorage.removeItem('currentUser');
    setAuthorisationToken(false);
    dispatch(loginUserSuccess({}));
  }
}