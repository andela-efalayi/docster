import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

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
 * @param {number} offset 
 * @returns {func} dispatch
 */
export function getRoleDocuments(offset) {
  return function(dispatch) {
    return axios.get(`/api/v1/role-documents`, {
      params: {
        offset
      }
    })
      .then(response => {
        if(!response.data.documents){
          dispatch(getRoleDocumentsSuccess({}));
        } else {
          dispatch(getRoleDocumentsSuccess(response.data.documents)); 
        }
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}