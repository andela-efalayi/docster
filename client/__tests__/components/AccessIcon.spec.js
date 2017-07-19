import React from 'react';
import { shallow } from 'enzyme';
import AccessIcon from '../../components/common/AccessIcon.jsx';

describe('AccessIcon.jsx', () => {
  it('should display a public tooltip for a public accessType', () => {
    const publicAccessIcon = shallow(
      <AccessIcon
        accessType='public'
      />
    );
  expect(publicAccessIcon.find('.access-icon')
  .node.props.tooltip).toEqual('public');
  });
  it('should display a role tooltip for a role accessType', () => {
    const roleAccessIcon = shallow(
      <AccessIcon
        accessType='role'
      />
    );
  expect(roleAccessIcon.find('.access-icon')
  .node.props.tooltip).toEqual('role');
  });
  it('should display a role tooltip for a private accessType', () => {
    const privateAccessIcon = shallow(
      <AccessIcon
        accessType='private'
      />
    );
  expect(privateAccessIcon.find('.access-icon')
  .node.props.tooltip).toEqual('private');
  });
});