import React from 'react';
import { shallow } from 'enzyme';

import { EditDocumentDialog }
from '../../../components/dialogs/EditDocumentDialog.jsx';
import { publicDocument } from '../../../__mocks__/mockData';

describe('DeleteDocumentAlert.jsx', () => {
  let props;
  beforeEach(() => {
    props = {
      updateDocument: jest.fn(() => new Promise(() => {}))
    };
  });
  const editDocumentDialog = 
  shallow(<EditDocumentDialog document={publicDocument} {...props} />);
  const openDialogMock = jest.fn(() => {
    editDocumentDialog.setState({
      open: true
    });
  });
  it('should render a button which opens a modal when clicked', () => {
    expect(editDocumentDialog.find('.open-edit-document-dialog').length)
    .toEqual(1);
    editDocumentDialog.find('.open-edit-document-dialog')
    .simulate('click', openDialogMock());
    expect(openDialogMock).toHaveBeenCalled();
  });
});