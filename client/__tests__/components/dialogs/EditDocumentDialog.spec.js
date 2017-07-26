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
  it('should run', () => {
    // console.log(editDocumentDialog);
  });
});