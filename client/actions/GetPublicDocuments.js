import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

/**
 * @param {object} documents
 * @returns {object} action
 */
export function getPublicDocumentsSuccess(documents) {
  return {
    type: ActionTypes.GET_PUBLIC_DOCUMENTS,
    documents
  }
}

/**
 * Get all public documents from database
 * @param {number} offset 
 * @returns {func} dispatch
 */
export function getPublicDocuments(offset) {
  return function(dispatch) {
    return axios.get(`/api/v1/public-documents`, {
      params: {
        offset
      }
    })
      .then(response => {
        if(!response.data.documents){
          dispatch(getPublicDocumentsSuccess({}));
        } else {
          dispatch(getPublicDocumentsSuccess(response.data.documents)); 
        }
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}
