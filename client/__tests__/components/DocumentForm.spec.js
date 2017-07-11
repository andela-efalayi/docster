import React from 'react';
import { shallow } from 'enzyme';
import { publicDocument } from '../../__mocks__/mockData';
import DocumentForm from '../../components/forms/DocumentForm.jsx';

describe('DocumentForm.jsx', () => {
  const onInputChange = jest.fn();
  const onEditorChange = jest.fn();

  const documentFormWrapper = shallow(
    <DocumentForm
      document={publicDocument}
      onInputChange={onInputChange}
      onEditorChange={onEditorChange}
    />
  );
  it('should render a form for creating and editing a document', () => {
    expect(documentFormWrapper.find('form')).toHaveLength(1);
    expect(documentFormWrapper.find('.twelve.columns')).toHaveLength(2);
    expect(documentFormWrapper.find('.twelve.columns').nodes[0]
    .props.children[0].type).toEqual('label');
    expect(documentFormWrapper.find('.twelve.columns')
    .nodes[0].props.children[1].type.propTypes).toBeDefined();
  });
});