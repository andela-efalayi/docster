import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';


/**
 * @param {object} documents
 * @returns {object} action
 */
export function loadUserDocumentsSuccess(documents) {
  return {
    type: ActionTypes.LOAD_USER_DOCUMENTS,
    documents
  }
}


/**
 * @param {number} userId 
 * @returns {func} dispatch
 */
export function loadUserDocuments(userId) {
  return function(dispatch) {
    return axios.get(`/users/${userId}/documents`)
      .then(response => {
        dispatch(loadUserDocumentsSuccess(response.data.documents));
      })
      .catch(error => {
        throw(error.data);
      });
  }
}