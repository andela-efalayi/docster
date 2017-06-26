import axios from 'axios';
import { loginUserSuccess } from  '../actions/Authenticate';

/**
 * @param {any} user 
 * @returns {func} dispatch
 */
export default function updateProfile(user) {
  return function(dispatch) {
    return axios.put(`/users/${user.id}`, user)
      .then(response => {
        const updatedUser = response.data.userWithUpdate;
        dispatch(loginUserSuccess(updatedUser));
      })
      .catch(error => {
        throw(error);
      });
  }
}