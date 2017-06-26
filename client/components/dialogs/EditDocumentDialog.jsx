import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { muiTheme1, muiTheme2 } from '../../muiTheme';
import DocumentForm from '../forms/DocumentForm.jsx';
import { updateDocument } from '../../actions/UpdateDocument';

/**
 * @class CreateDocumentDialog
 * @extends {React.Component}
 */
class EditDocumentDialog extends Component {

  /**
   * Creates an instance of CreateDocumentDialog.
   * @param {any} props 
   * @memberof CreateDocumentDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
      id: this.props.document.id
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  /**
   * @param {any} event 
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  updateDocument() {
    this.props.updateDocument(this.state)
    .then(() => {
      this.setState({
        open: false
      });
    });
  }

  /**
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  closeDialog() {
    this.setState({open: false});
  }

  /**
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
        label="Cancel"
        secondary
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        label="update document"
        primary
        keyboardFocused
        onTouchTap={this.updateDocument}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <IconButton
            onClick={this.openDialog}
          >
            <ModeEdit />
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme2}>
          <div className="container">
            <Dialog
              title={`Editing document: ${this.state.title}`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <DocumentForm 
                onInputChange={this.onInputChange}
                document={this.state}
              />
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

EditDocumentDialog.propTypes = {
  document: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDocument: bindActionCreators(updateDocument, dispatch)
  };
}
export default 
  connect(mapStateToProps, mapDispatchToProps)(EditDocumentDialog);
