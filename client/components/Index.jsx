import React, { Component } from 'react';

/**
 * @class Index
 * @extends {Component}
 */
class Index extends Component {

  /**
   * @memberof Index
   */
  constructor() {
    super();
    this.state = {
      message: 'This is a fullstack document management system'
    };
  }

  /**
   * @memberof Index
   * @returns {object} react-element
   */
  render() {
    return (
      <div className="container">
        <h2 className="blue-text center">Docster</h2>
        <h6 className="center">{this.state.message}</h6>
      </div>
    );
  }
}

export default Index;
