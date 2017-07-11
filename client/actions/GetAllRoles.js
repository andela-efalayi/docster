import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';


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
    return axios.get('/docster/api/v1/roles')
      .then(response => {
        const roles = response.data.roles;
        dispatch(getAllRolesSuccess(roles));
      })
      .catch(response => {
        const error = getServerError(response);
        throw(error);
      });
  }
}
