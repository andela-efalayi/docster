import axios from 'axios';
import { loginUserSuccess } from  '../actions/Authenticate';
import getServerError from '../utils/GetServerError';

/**
 * Update user's details
 * @param {object} userUpdate 
 * @returns {func} dispatch
 */
export default function updateUser(userUpdate) {
  return function(dispatch) {
    return axios.put(`/api/v1/users/${userUpdate.id}`, userUpdate)
      .then(response => {
        const updatedUser = response.data.userWithUpdate;
        dispatch(loginUserSuccess(updatedUser));
      })
      .catch(response => {
        const errorMessage = getServerError(response);
        throw(errorMessage.data.dbError[0].message);
      });
  }
}