import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {red500} from 'material-ui/styles/colors';
import { muiTheme1 } from '../../muiTheme';
import { deleteDocument } from '../../actions/DeleteDocument';
import ConfirmActionDialog from '../dialogs/ConfirmActionDialog.jsx';
import showToast from '../../utils/ShowToast';

/**
 * @class DeleteDocumentAlert
 * @extends {React.Component}
 */
export class DeleteDocumentAlert extends Component {

  /**
   * Creates an instance of DeleteDocumentAlert.
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
   * @memberof DeleteDocumentAlert
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
   * @memberof DeleteDocumentAlert
   * @returns {void}
   */
  closeDialog() {
    this.setState({open: false});
  }

  /**
   * Open dialog
   * @memberof DeleteDocumentAlert
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
        <ConfirmActionDialog
          open={this.state.open}
          title={`Are you sure you want to delete ${this.state.document.title}`}
          cancelText='cancel'
          proceedText='continue'
          buttonStyle={2}
          cancelAction={this.closeDialog}
          proceedAction={this.deleteDocument}
        />
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
