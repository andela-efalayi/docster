import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders Tinymce editor in document form.
 * @class TinyEditorComponent
 * @extends {Component}
 */
class TinyEditorComponent extends Component {

  /**
   * Creates an instance of TinyEditorComponent.
   * @memberof TinyEditorComponent
   */
  constructor() {
    super();
    this.state = { editor: null };
  }

  /**
   * @memberof TinyEditorComponent
   * @returns {void}
   */
  componentDidMount() {
    tinymce.init({
      branding: false,
      height: 150,
      selector: `#${this.props.id}`,
      plugins: 'wordcount table',
      setup: editor => {
        this.setState({ editor });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.props.onEditorChange(content);
        });
      }
    });

    tinymce.activeEditor.setContent(this.props.value);
  }

  /**
   * @memberof TinyEditorComponent
   * @returns {void}
   */
  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  /**
   * @memberof TinyEditorComponent
   * @return {object} react-component
   */
  render() {
    return (
      <textarea
        id={this.props.id}
        defaultValue={this.props.value}
      />
    );
  }
}

TinyEditorComponent.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired
}
export default TinyEditorComponent;
