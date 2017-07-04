import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} documents
 * @returns {object} action
 */
export function getRoleDocumentsSuccess(documents) {
  return {
    type: ActionTypes.GET_ROLE_DOCUMENTS,
    documents
  }
}

/**
 * @param {number} userId 
 * @returns {func} dispatch
 */
export function getRoleDocuments() {
  return function(dispatch) {
    return axios.get(`/role-documents`)
      .then(response => {
        dispatch(getRoleDocumentsSuccess(response.data.documents));
      })
      .catch(error => {
        throw(error);
      });
  }
}