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
 * Get all role documents from database
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
        let errorMessage = JSON.parse(JSON.stringify(error));
        const message = errorMessage.response.data.message;
        throw(message);
      });
  }
}