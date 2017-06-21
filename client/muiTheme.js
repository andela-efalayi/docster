import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#ff9800', // selected tab
    accent2Color: '#000013',
    accent3Color: 'grey500',
    primary1Color: '#000013', // appbar color
    primary2Color: '#000013',
    primary3Color: '#000013',
    alternateTextColor: '#ff9800', // tabs
    canvasColor: '#474262',
    borderColor: '#1e1b38',
    disabledColor: '#88c6ff',
    pickerHeaderColor: '#4b96ff',
    clockCircleColor: '#4b96ff',
    shadowColor: '#0069cb',
  }
});

export default muiTheme;
