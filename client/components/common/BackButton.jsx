import React from 'react';
import { Link } from 'react-router-dom';
import Home from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme1 } from '../../muiTheme';

/*
Back button component
  Redirects user to user's landing page
*/
const BackButton = () => {
  return(
    <MuiThemeProvider muiTheme={muiTheme1}> 
      <RaisedButton 
        primary
        icon={<Home />}
        containerElement={<Link to='/app' />}
      />
    </MuiThemeProvider>
  );
};

export default BackButton;