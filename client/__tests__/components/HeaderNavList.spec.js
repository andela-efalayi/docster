import React from 'react';
import { shallow } from 'enzyme';
import { currentUser } from '../../__mocks__/mockData';
import HeaderNavList from '../../components/common/HeaderNavList.jsx';

describe('HeaderNavList.jsx', () => {
  const logoutUser = jest.fn();
  const regularUser = shallow(
    <HeaderNavList roleId={currentUser.roleId} logoutUser={logoutUser} />
  );
  const admin = shallow(
    <HeaderNavList roleId={1} logoutUser={logoutUser} />
  );
  it('should render 6 items in dropdown list', () => {
    expect(regularUser.node.props.children.length).toEqual(6);
    expect(admin.node.props.children.length).toEqual(6);       
  });
});