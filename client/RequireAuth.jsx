import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @param {any} component 
 * @returns {object} react-component
 */
export default function requireAuth(component) {

  /**
   * @class RenderedComponent
   * @extends {Component}
   */
  class RenderedComponent extends Component {
    
    /**
     * Creates an instance of RenderedComponent.
     * @param {any} props 
     * @param {any} context 
     * @memberof RenderedComponent
     */
    constructor(props, context){
      super(props, context);
    }
    /**
     * @memberof RenderedComponent
     * @returns {void}
     */
    componentWillMount() {
      if (!this.props.isAuthenticated){
        this.context.router.history.push('/');
      }
    }

    /**
     * @memberof RenderedComponent
     * @param {object} nextProps
     * @returns {void}
     */
    componentWillUpdate(nextProps) {
      if(nextProps.isAuthenticated) {
        this.context.router.history.push('/home');
      }
    }

    /**
     * @memberof RenderedComponent
     * @returns {object} react-component
     */
    render() {
      return(
        <component {...this.state} />
      );
    }
  }

  RenderedComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  RenderedComponent.contextTypes = {
    router: PropTypes.object.isRequired
  }
  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }
  return connect(mapStateToProps)(RenderedComponent);
}
