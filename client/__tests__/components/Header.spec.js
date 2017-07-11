import React from 'react';
import { shallow } from 'enzyme';
import { currentUser } from '../../__mocks__/mockData';
import Header from '../../components/common/Header.jsx';

describe('Header.jsx', () => {
  const logoutUser = jest.fn();
  const wrapper = shallow(
    <Header currentUser={currentUser} logoutUser={logoutUser} />
  );
  it('should render app name', () => {
    expect(wrapper.find('.main-header').node.props.title).toBeDefined();
  });
  it('should render user name', () => {
    expect(wrapper.find('.main-header').node.props.children.props.currentUser)
    .toEqual(currentUser)
  });
});