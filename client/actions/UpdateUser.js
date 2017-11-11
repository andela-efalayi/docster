import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import { loginUserSuccess } from  '../actions/Authenticate';
import getServerError from '../utils/GetServerError';
import { isAdmin } from '../utils/CheckUserIdentity';

/**
 * Update user's role
 * @param {object} user 
 * @returns {object} action
 */
export function updateUserRole(user) {
  return{
    type: ActionTypes.UPDATE_USER_ROLE,
    user
  }
}

/**
 * Update user's details
 * @param {object} userUpdate 
 * @returns {func} dispatch
 */
export function updateUser(userUpdate) {
  return function(dispatch) {
    return axios.put(`/api/v1/users/${userUpdate.id}`, userUpdate)
      .then(response => {
        const updatedUser = response.data.userWithUpdate;
        if(isAdmin() === true && userUpdate.id !== 1) {
          dispatch(updateUserRole(updatedUser));
        }
        dispatch(loginUserSuccess(updatedUser));        
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}