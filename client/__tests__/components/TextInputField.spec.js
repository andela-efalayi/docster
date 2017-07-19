import React from 'react';
import { shallow } from 'enzyme';
import { textInputFieldError, textInputFieldProps } 
from '../../__mocks__/mockData';
import TextInputField from '../../components/common/TextInputField.jsx';

describe('TextInputField.jsx', () => {
  const onInputChangeMock = jest.fn();
  const textInputField = shallow(
    <TextInputField
      error={textInputFieldError}
      type={textInputFieldProps.type}
      name={textInputFieldProps.name}
      placeholder={textInputFieldProps.placeholder}
      value={textInputFieldProps.value}
      onInputChange={onInputChangeMock}
    />
  );
  it('should render an input field with appropriate type'+
  ', name, placeholder and name', () => {
    expect(textInputField.find('input')).toHaveLength(1);

    expect(textInputField.find('input')
    .node.props.type).toEqual(textInputFieldProps.type);

    expect(textInputField.find('input')
    .node.props.name).toEqual(textInputFieldProps.name);

    expect(textInputField.find('input')
    .node.props.placeholder).toEqual(textInputFieldProps.placeholder);

    expect(textInputField.find('input')
    .node.props.value).toEqual(textInputFieldProps.value);
  });
});