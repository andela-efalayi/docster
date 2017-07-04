import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  CREATE_NEW_USER_SUCCESS: null,
  CREATE_DOCUMENT: null,
  DELETE_DOCUMENT: null,
  GET_ALL_USERS: null,
  GET_ALL_ROLES: null,
  GET_PUBLIC_DOCUMENTS: null,
  GET_ROLE_DOCUMENTS: null,
  GET_USER_DOCUMENTS: null,
  SET_CURRENT_USER: null,
  SEARCH_ALL_DOCUMENTS: null,
  UPDATE_DOCUMENT: null,
  UPDATE_PROFILE: null
});

export default ActionTypes;
