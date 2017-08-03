import filter from 'lodash/filter';
import DocumentReducer from '../../reducers/DocumentReducer';
import { getPublicDocumentsAction,
  getRoleDocumentsAction, getUserDocumentsAction,
  defaultAction, updateDocumentAction,
  deleteDocumentAction, createDocumentAction } from '../../__mocks__/mockData';

let allUserDocuments;
describe('DocumentReducer.js', () => {
  const initialState = {rows:[], count: 0};
  it('should return all user documents', () => {
    allUserDocuments = DocumentReducer(initialState, getUserDocumentsAction);
    expect(allUserDocuments.count).toBeDefined();
    expect(allUserDocuments.rows).toBeDefined();
    expect(allUserDocuments.rows)
    .toEqual(getUserDocumentsAction.documents.rows);
  });
  it('should return public documents', () => {
    const documents = DocumentReducer(initialState, getPublicDocumentsAction);
    expect(documents.count).toBeDefined();
    expect(documents.rows).toBeDefined();
    expect(documents.rows)
    .toEqual(getPublicDocumentsAction.documents.rows);
  });
  it('should return role documents', () => {
    const documents = DocumentReducer(initialState, getRoleDocumentsAction);
    expect(documents.count).toBeDefined();
    expect(documents.rows).toBeDefined();
    expect(documents.rows).toEqual(getRoleDocumentsAction.documents.rows);
  });
  it('should update state with new document', () => {
    const documents = DocumentReducer(allUserDocuments, createDocumentAction);
    expect(allUserDocuments.rows.length).not.toEqual(documents.rows.length);
  });
  it('should update state with updated document', () => {
    const documents = DocumentReducer(allUserDocuments, updateDocumentAction);
    const formerDocument = filter(allUserDocuments.rows, ['id', 1]);
    const update = filter(documents.rows, ['id', 1] );
    expect(documents.rows.length).toEqual(allUserDocuments.rows.length);
    expect(formerDocument).not.toEqual(update);
  });
  it('should update state with deleted document', () => {
    const documents = DocumentReducer(allUserDocuments, deleteDocumentAction);
    expect(allUserDocuments.rows.length).not.toEqual(documents.rows.length);
  });
  it('should return initialState if no action is specified', () => {
    const documents = DocumentReducer(initialState, defaultAction);
    expect(documents).toEqual(initialState);
  });
});