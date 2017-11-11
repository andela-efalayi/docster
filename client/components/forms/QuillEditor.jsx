import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Renders Quill editor in document form.
 * @class QuillEditor
 * @extends {Component}
 */
class QuillEditor extends Component {

  /**
   * Creates an instance of QuillEditor.
   * @memberof QuillEditor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      theme: 'snow'
    }
  }

  /**
   * @memberof QuillEditor
   * @return {object} react-component
   */
  render() {
    return (
      <div>
        <ReactQuill
          theme={this.state.theme}
          value={this.props.editorContent}
          onChange={this.props.onEditorChange}
        />
      </div>
    );
  }
}

QuillEditor.propTypes = {
  editorContent: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired
}
export default QuillEditor;
