import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  CREATE_NEW_USER_SUCCESS: null,
  CREATE_DOCUMENT: null,
  DELETE_DOCUMENT: null,
  GET_USER_DETAILS: null,
  LOAD_USER_DOCUMENTS: null,
  SET_CURRENT_USER: null,
  UPDATE_DOCUMENT: null
});

export default ActionTypes;
