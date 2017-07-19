import React from 'react';
import { shallow } from 'enzyme';
import { currentUser } from '../../__mocks__/mockData';
import Header from '../../components/common/Header.jsx';

describe('Header.jsx', () => {
  const logoutUserMock = jest.fn();
  const header = shallow(
    <Header currentUser={currentUser} logoutUser={logoutUserMock} />
  );
  it('should render app name', () => {
    expect(header.find('.main-header').node.props.title).toBeDefined();
  });
  it('should render user name', () => {
    expect(header.find('.main-header').node.props.children.props.currentUser)
    .toEqual(currentUser)
  });
});