import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} documents
 * @returns {object} action
 */
export function getUserDocumentsSuccess(documents) {
  return {
    type: ActionTypes.GET_USER_DOCUMENTS,
    documents
  }
}

/**
 * Get user's documents from database
 * @param {number} userId 
 * @param {number} offset
 * @returns {func} dispatch
 */
export function getUserDocuments(userId, offset) {
  return function(dispatch) {
    return axios.get(`/users/${userId}/documents`, {
      params: {
        offset
      }
    })
      .then(response => {
        dispatch(getUserDocumentsSuccess(response.data.documents));
      })
      .catch(error => {
        throw(error);
      });
  }
}