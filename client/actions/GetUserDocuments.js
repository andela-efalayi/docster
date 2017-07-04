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
 * @param {number} userId 
 * @returns {func} dispatch
 */
export function getUserDocuments(userId) {
  return function(dispatch) {
    return axios.get(`/users/${userId}/documents`)
      .then(response => {
        dispatch(getUserDocumentsSuccess(response.data.documents));
      })
      .catch(error => {
        throw(error);
      });
  }
}