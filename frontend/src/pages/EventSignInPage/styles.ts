import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventSignInCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '600px',
    paddingBottom: '30px',
    [theme.breakpoints.up('sm')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  eventName: {
    maxWidth: '434.733px',
    wordWrap: 'break-word',
  },
  logo: {
    width: '150px',
    height: '107px',
    marginTop: '28px',
    [theme.breakpoints.down('sm')]: {
      width: '14vh',
      height: '10vh',
    },
  },
}));

export default useStyles;