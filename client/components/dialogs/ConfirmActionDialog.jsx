import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { muiTheme2 } from '../../muiTheme';

const ConfirmActionDialog = ({open, title, cancelText,
  proceedText, buttonStyle, cancelAction, proceedAction}) => {

  const actions = buttonStyle == 1 ? ([
    <FlatButton
      className="cancel-dialog-btn"
      label={cancelText}
      secondary
      onTouchTap={cancelAction}
    />,
    <RaisedButton
      className="confirm-action-btn"
      label={proceedText}
      primary
      keyboardFocused
      onTouchTap={proceedAction}
    />,
  ]) : ([
    <FlatButton
      className="cancel-dialog-btn"
      label={cancelText}
      primary
      onTouchTap={cancelAction}
    />,
    <RaisedButton
      className="confirm-action-btn"
      label={proceedText}
      secondary
      keyboardFocused
      onTouchTap={proceedAction}
    />,
  ]);
  return(
    <MuiThemeProvider muiTheme={muiTheme2}>
      <div className="container">
        <Dialog
          className="confirm-action-dialog"
          title='Confirm action'
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={cancelAction}
          autoScrollBodyContent
        >
          <h5>{title}</h5>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
}

ConfirmActionDialog.propTypes = {
  buttonStyle: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  proceedText: PropTypes.string.isRequired,
  cancelAction: PropTypes.func.isRequired,
  proceedAction: PropTypes.func.isRequired,  
}
export default ConfirmActionDialog;
