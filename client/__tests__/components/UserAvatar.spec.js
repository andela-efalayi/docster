import React from 'react';
import { shallow } from 'enzyme';
import { currentUser } from '../../__mocks__/mockData';
import UserAvatar from '../../components/common/UserAvatar.jsx';

describe('UserAvatar.jsx', () => {
  const user = shallow(
    <UserAvatar user={[currentUser.fullName, currentUser.userName]}  />
  );
  it('should render first letter in user fullname', () => {
    expect(typeof(user.node.props.children)).toEqual("string");
    expect(user.node.props.leftAvatar.props.children)
    .toEqual(currentUser.fullName.charAt(0));   
  });
});