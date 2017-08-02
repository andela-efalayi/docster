import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AppIcon from 'material-ui/svg-icons/image/center-focus-strong';
import HeaderItems from '../common/HeaderItems.jsx';
import {muiTheme1} from '../../muiTheme';
import { logoutUser } from '../../actions/Authenticate';

/**
 * @class Header
 * @extends {Component}
 */
export class Header extends Component{

  /**
   * Creates an instance of Header.
   * @param {any} props 
   * @memberof Header
   */
  constructor(props){
    super(props);
    this.state = {
      user: this.props.auth.currentUser,
      isAuthenticated: this.props.auth.isAuthenticated
    }
    this.logoutUser = this.logoutUser.bind(this);
  }

  
  /**
   * @param {any} nextProps 
   * @memberof Header
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated !== this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: nextProps.auth.isAuthenticated,
        user: nextProps.auth.currentUser
      });
    }
  }

  /**
   * Logs user out of app and redirect to index page
   * @memberof Header
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }

  /**
   * @memberof Header
   * @returns {object} react-component
   */
  render(){
    const { isAuthenticated, user } = this.state;
    return(
      <div>
        {
          isAuthenticated === true  ? (
            <div>
              <div className="bg-purple" />
              <MuiThemeProvider muiTheme={muiTheme1}>
                <AppBar
                  className="main-header"
                  title="Docster"
                  iconElementLeft={
                    <IconButton>
                      <Link to="/my-documents">
                        <AppIcon viewBox='0 2 21 21' /></Link>
                    </IconButton>
                  }
                >
                  <HeaderItems
                    currentUser={user}
                    logoutUser={this.logoutUser}
                  />
                </AppBar>
              </MuiThemeProvider>
            </div>
          ) : null
        }
      </div>
    );
  }
}

// Set proptypes
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const matchStateToProps = (state) => {
  return{
    auth: state.auth
  }
}
export default connect(matchStateToProps, { logoutUser })(withRouter(Header));
