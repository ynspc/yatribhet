import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
 
  palette: {
    primary: {
      light: '#7986cb',
      main: '#FA6400',
      dark: '#F57D2D',
      contrastText: '#fff',
    },
    whiteText:{
      color:'#ffffff'
    },
    asd:{
      backgroundColor:'#000000',
      color:'#000000'
    },
    secondary: {
      light: '#000000',
      main: '#ffffff',
      dark: '#000000',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h6: {
      fontSize: "1rem"
    }
  }
});

export default theme;