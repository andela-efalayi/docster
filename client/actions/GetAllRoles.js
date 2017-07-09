import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';


/**
 * @param {any} roles
 * @returns {object} action
 */
export function getAllRolesSuccess(roles) {
  return {
    type: ActionTypes.GET_ALL_ROLES,
    roles
  }
}

/**
 * Get all roles from database
 * @returns {func} dispatch
 */
export function getAllRoles() {
  return function(dispatch) {
    return axios.get('/roles')
      .then(response => {
        const roles = response.data.roles;
        dispatch(getAllRolesSuccess(roles));
      })
      .catch(error => {
        throw(error);
      })
  }
}