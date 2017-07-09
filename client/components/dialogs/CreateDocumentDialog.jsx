import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { muiTheme1, muiTheme2 } from '../../muiTheme';
import DocumentForm from '../forms/DocumentForm.jsx';
import { createDocument } from '../../actions/CreateDocument';
import { formIsValid } from '../../utils/Validate';
import showToast from '../../utils/ShowToast';

/**
 * @class CreateDocumentDialog
 * @extends {React.Component}
 */
class CreateDocumentDialog extends Component {

  /**
   * Creates an instance of CreateDocumentDialog.
   * @param {any} props 
   * @memberof CreateDocumentDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      content: '',
      access: '',
      userId: this.props.user.id,
      errors: {}
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.createDocument = this.createDocument.bind(this);
  }

  /**
   * @param {object} event 
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Get content from tinymce editor
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  onEditorChange() {
    this.setState({
      content: tinymce.activeEditor.getContent(),
    })
  }

  /**
   * Create document
   * @memberof CreateDocumentDialog
   * @returns {void}
   */
  createDocument() {
    const { isValid } = formIsValid(this.state);
    if(isValid === true) {
      this.props.createDocument(this.state).then(() => {
        showToast('Document was successfully created.', 'success');
        this.setState({
          open: false,
          title: '',
          content: '',
          access: ''
        });
      })
      .catch(errorMessage => {
        showToast(errorMessage, 'error');
      });
    }
    else{
      showToast('Your document has to have a title, content and '+
      'an access attribute. Please fill all required fields.','warning');
    }
  }

  /**
   * Close Dialog
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
        label="Cancel"
        secondary
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        label="Create document"
        primary
        keyboardFocused
        onTouchTap={this.createDocument}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <RaisedButton 
            label="create document" 
            onTouchTap={this.openDialog} 
            primary
            fullWidth
          />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme2}>
          <div className="container">
            <Dialog
              title="New Document"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <DocumentForm 
                onInputChange={this.onInputChange} 
                onEditorChange={this.onEditorChange}
                document={this.state} 
              />
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

CreateDocumentDialog.propTypes = {
  user: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDocument: bindActionCreators(createDocument, dispatch)
  };
}
export default 
  connect(mapStateToProps, mapDispatchToProps)(CreateDocumentDialog);
