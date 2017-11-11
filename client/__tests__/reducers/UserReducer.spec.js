import filter from 'lodash/filter';
import UserReducer from '../../reducers/UserReducer';
import { existingUser1, getUsersAction, updateUserRoleAction,
  defaultAction } from '../../__mocks__/mockData';

describe('UserReducer.js', () => {
  const initialState = {};
  let allUsers;
  it('should return users', () => {
    allUsers = UserReducer(initialState, getUsersAction);
    expect(allUsers.count).toBeDefined();
    expect(allUsers.rows).toBeDefined();
    expect(allUsers.rows.length).toEqual(getUsersAction.users.rows.length);
  });
  it('should update state with updated user role', () => {
    const users = UserReducer(allUsers, updateUserRoleAction);
    const userInitialDetails = filter(allUsers.rows, ['id', existingUser1.id]);
    const userUpdatedDetails = filter(users.rows, ['id', existingUser1.id]);
    expect(userInitialDetails[0].fullName)
    .toEqual(userUpdatedDetails[0].fullName);

    expect(userInitialDetails[0].roleId).not
    .toEqual(userUpdatedDetails[0].roleId);
  });
  it('should return initialState if no action is specified', () => {
    const users = UserReducer(initialState, defaultAction);
    expect(users).toEqual(initialState);
  });
});