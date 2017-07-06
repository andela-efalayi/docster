import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

/**
 * @class ErrorAlert
 * @extends {React.Component}
 */
class ErrorAlert extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  /**
   * @memberof ErrorAlert
   * @returns {object} react-component
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Discard draft?
      </Dialog>
    );
  }
}

export default ErrorAlert;
