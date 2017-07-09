import axios from 'axios';
import { loginUserSuccess } from  '../actions/Authenticate';

/**
 * Update user's details
 * @param {object} user 
 * @returns {func} dispatch
 */
export default function updateProfile(user) {
  return function(dispatch) {
    return axios.put(`/users/${user.id}`, user)
      .then(response => {
        const updatedUser = response.data.userWithUpdate;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        dispatch(loginUserSuccess(updatedUser));
      })
      .catch(error => {
        throw(error);
      });
  }
}