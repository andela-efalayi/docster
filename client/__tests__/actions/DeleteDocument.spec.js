import thunk from 'redux-thunk';
import moxios from  'moxios';
import reduxStore from 'redux-mock-store';
import * as action from '../../actions/DeleteDocument';
import ActionTypes from '../../../constants/ActionTypes';
import { publicDocument } from '../../__mocks__/mockData'

const configureMockStore = reduxStore([thunk]);

describe('DeleteDocument.js', () =>{
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should delete a document', () => {
    moxios.stubRequest(`/api/v1/documents/${publicDocument.id}`, {
      status: 200,
      response: "Document deleted"
    });
    const expectedAction = [{
      document: publicDocument,      
      type: ActionTypes.DELETE_DOCUMENT,
    }];
    const store = configureMockStore();
    return store.dispatch(action.deleteDocument(publicDocument))
    .then(() => { 
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
