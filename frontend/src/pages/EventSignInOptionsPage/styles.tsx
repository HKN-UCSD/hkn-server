import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
  },
  buttonsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down(600)]: {
      width: 300,
      marginTop: '150px',
    },
  },
  button: {
    marginBottom: '50px',
  },
  h2: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#000000',
    marginBottom: '60px',
    [theme.breakpoints.down(600)]: {
      fontSize: '20px',
      marginBottom: '40px',
    },
  },
}));

export default useStyles;
