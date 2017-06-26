import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const muiTheme1 = getMuiTheme({
  palette: {
    accent1Color: '#ff9800', // selected tab
    accent2Color: '#000013',
    accent3Color: 'grey500',
    primary1Color: '#000013', // appbar color
    primary2Color: '#000013',
    primary3Color: '#000013',
    textColor: '#ff9800', // text color
    alternateTextColor: '#ff9800', // tabs
    canvasColor: '#474262',
    borderColor: '#1e1b38',
    disabledColor: '#88c6ff',
    pickerHeaderColor: '#4b96ff',
    clockCircleColor: '#4b96ff',
    shadowColor: '#0069cb',
  }
});

export const muiTheme2 = getMuiTheme({
    palette: {
    accent1Color: '#D50000', // cancel button
    accent2Color: '#ffffff',
    accent3Color: '#ffffff',
    primary1Color: '#ff9800', // primary button
    primary2Color: '#ffffff',
    primary3Color: '#ffffff',
    textColor: '#000013', // text color
    alternateTextColor: '#ffffff', // tabs
    borderColor: '#ffffff',
    shadowColor: '#000013',
  }
});


