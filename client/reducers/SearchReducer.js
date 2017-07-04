import ActionTypes from '../../constants/ActionTypes';
import InitialState from './InitialState';


/**
 * @param {array} [state=InitialState.searchResult] 
 * @param {object} action 
 * @returns {any} state
 */
export default function 
  SearchReducer(state=InitialState.searchResult, action) {
    switch(action.type){
      case ActionTypes.SEARCH_ALL_DOCUMENTS:
        return action.documents;
      default:
        return state
    }
}