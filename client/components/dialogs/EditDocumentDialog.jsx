import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue600 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { muiTheme1, muiTheme2 } from '../../muiTheme';
import DocumentForm from '../forms/DocumentForm.jsx';
import { updateDocument } from '../../actions/UpdateDocument';

/**
 * @class EditDocumentDialog
 * @extends {React.Component}
 */
export class EditDocumentDialog extends Component {

  /**
   * Creates an instance of EditDocumentDialog
   * @param {any} props 
   * @memberof EditDocumentDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
      id: this.props.document.id,
      slug: this.props.document.slug
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  /**
   * @param {object} event 
   * @memberof EditDocumentDialog
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  /** Get content from tinymce editor
   * @memberof EditDocumentDialog
   * @returns {void}
   */
  onEditorChange() {
    this.setState({
      content: tinymce.activeEditor.getContent(),
    })
  }

  /**
   * Update document
   * @memberof EditDocumentDialog
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
   * Close dialog
   * @memberof EditDocumentDialog
   * @returns {void}
   */
  closeDialog() {
    this.setState({open: false});
  }

  /**
   * @memberof EditDocumentDialog
   * @returns {void}
   */
  openDialog() {
    this.setState({open: true});     
  }

  /**
   * @memberof EditDocumentDialog
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
        className="update-document-btn"
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
            className="open-edit-document-dialog"
            onClick={this.openDialog}
          >
            <ModeEdit color={blue600} />
          </IconButton>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme2}>
          <div className="container">
            <Dialog
              className="edit-document-dialog"
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
                onEditorChange={this.onEditorChange}
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
  updateDocument: PropTypes.func
}
EditDocumentDialog.defaultProps = {
  updateDocument: null
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDocument: bindActionCreators(updateDocument, dispatch)
  };
}
export default 
  connect(null, mapDispatchToProps)(EditDocumentDialog);
