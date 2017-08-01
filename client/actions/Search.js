import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

/**
 * @param {object} documents 
 * @returns {object} action
 */
export function searchDocumentsSuccess(documents) {
  return {
    type: ActionTypes.SEARCH_ALL_DOCUMENTS,
    documents
  }
}

/**
 * @param {object} users 
 * @returns {object} action
 */
export function searchUsersSuccess(users) {
  return {
    type: ActionTypes.SEARCH_ALL_USERS,
    users
  }
}

/**
 * Search for document in database
 * @param {any} searchString 
 * @returns {func} dispatch
 */
export function searchDocuments(searchString) {
  return function(dispatch) {
    return axios.get(`/api/v1/search/documents`, {
      params: {
        q: searchString
      }
    })
      .then(response => {
        const documents = response.data.documents
        dispatch(searchDocumentsSuccess(documents));
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}

/**
 * Search for document in database
 * @param {any} searchString 
 * @returns {func} dispatch
 */
export function searchUsers(searchString) {
  return function(dispatch) {
    return axios.get(`/api/v1/search/users`, {
      params: {
        q: searchString
      }
    })
      .then(response => {
        const users = response.data.users
        dispatch(searchUsersSuccess(users));
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}