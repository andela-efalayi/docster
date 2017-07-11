import axios from 'axios';
import { loginUserSuccess } from  '../actions/Authenticate';
import getServerError from '../utils/GetServerError';

/**
 * Update user's details
 * @param {object} user 
 * @returns {func} dispatch
 */
export default function updateProfile(user) {
  return function(dispatch) {
    return axios.put(`/docster/api/v1/users/${user.id}`, user)
      .then(response => {
        const updatedUser = response.data.userWithUpdate;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        dispatch(loginUserSuccess(updatedUser));
      })
      .catch(response => {
        const errorMessage = getServerError(response);
        throw(errorMessage.data.dbError[0].message);
      });
  }
}