import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import { muiTheme1, muiTheme2 } from '../../muiTheme';
import { deleteDocument } from '../../actions/DeleteDocument';
import showToast from '../../utils/ShowToast';

/**
 * @class CreateDocumentDialog
 * @extends {React.Component}
 */
export class DeleteDocumentAlert extends Component {

  /**
   * Creates an instance of CreateDocumentDialog.
   * @param {any} props 
   * @memberof CreateDocumentDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      document: this.props.document
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Delete document
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  deleteDocument() {
    this.props.deleteDocument(this.state.document)
    .then(() => {
      showToast('Document deleted', 'success');
    })
    .catch(errorMessage => {
      showToast(errorMessage, 'error');
    });
    this.setState({
      open: false
    });
  }

  /**
   * Close dialog
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  closeDialog() {
    this.setState({open: false});
  }

  /**
   * Open dialog
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  openDialog() {
    this.setState({open: true});
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {object} dialog
   */
  render() {
    const actions = [
      <FlatButton
        className="cancel-dialog-btn"
        label="Cancel"
        primary
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        className="delete-document-btn"
        label="delete document"
        secondary
        keyboardFocused
        onTouchTap={this.deleteDocument}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <IconButton
            className="open-delete-dialog"
            onClick={this.openDialog}
          >
            <ActionDelete color={red500} />
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme2}>
          <div className="container">
            <Dialog
              className="delete-document-dialog"
              title={`Delete document: ${this.state.document.title}`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <h5>Are you sure you want to delete this document?</h5>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

DeleteDocumentAlert.propTypes = {
  document: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func
}
DeleteDocumentAlert.defaultProps = {
  deleteDocument: null
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDocument: bindActionCreators(deleteDocument, dispatch)
  };
}
export default 
  connect(null, mapDispatchToProps)(DeleteDocumentAlert);
