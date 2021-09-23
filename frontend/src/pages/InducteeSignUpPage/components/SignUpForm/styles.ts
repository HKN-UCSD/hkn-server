import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  signUp: {
    marginTop: 8,
  },
  signInRedirect: {
    color: '#5B5B5B',
    textTransform: 'none',
  },
  logo: {
    minWidth: '78px',
    minHeight: '56px',
    width: '44vh',
    height: '32vh',
  },
}));

export default useStyles;
