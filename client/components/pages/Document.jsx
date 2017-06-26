import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import { muiTheme1 } from '../../muiTheme';


const Document = ({ document }) => (
  <div className="document">
    <div className="document-details">
      <div className="row">
        <div className="ten columns">
          <h5>{document.title}</h5>
        </div>
        <div className="two columns">
          <span className="document-id">{`#${document.id}`}</span>
        </div>
      </div>
    </div>
    <div className="document-content">
      <p>
        {document.content}
      </p>
      <div className="u-pull-right">
        <MuiThemeProvider muiTheme={muiTheme1}>
          <IconButton>
            <ActionDelete color={red500} />
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <IconButton>
            <ModeEdit />
          </IconButton>
        </MuiThemeProvider>
      </div>
    </div>
  </div>
);

Document.propTypes = {
  document: PropTypes.object.isRequired
}

export default Document;
