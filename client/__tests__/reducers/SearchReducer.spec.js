import SearchReducer from '../../reducers/SearchReducer';
import { searchUsersAction, searchDocumentsAction,
  defaultAction } from '../../__mocks__/mockData';

describe('UserReducer.js', () => {
  const initialState = {};
  it('should return search result for users', () => {
    const searchResult = SearchReducer(initialState, searchUsersAction);
    expect(searchResult.count).toBeDefined();
    expect(searchResult.rows).toBeDefined();
    expect(searchResult.rows.length)
    .toEqual(searchUsersAction.users.rows.length);
  });
  it('should return search result for documents', () => {
    const searchResult = SearchReducer(initialState, searchDocumentsAction);
    expect(searchResult.count).toBeDefined();
    expect(searchResult.rows).toBeDefined();
    expect(searchResult.rows.length)
    .toEqual(searchDocumentsAction.documents.rows.length);
  });
  it('should return initialState if no action is specified', () => {
    const searchResult = SearchReducer(initialState, defaultAction);
    expect(searchResult).toEqual(initialState);
  });
});
