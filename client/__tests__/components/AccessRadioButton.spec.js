import React from 'react';
import { shallow } from 'enzyme';
import AccessRadioButton from '../../components/common/AccessRadioButtons.jsx';

describe('AccessRadioButton.jsx', () => {
  const onOptiontChangeMock = jest.fn();
  it('should display a radiobutton', () => {
    const accessRadioButton = shallow(
      <AccessRadioButton
        access='role'
        onOptionChange={onOptiontChangeMock}
      />
    );
    expect(accessRadioButton
      .find('.document-access-options')).toHaveLength(1);
    expect(accessRadioButton
      .find('.document-access-options').node.props.defaultSelected)
      .toEqual('role');
  });
});