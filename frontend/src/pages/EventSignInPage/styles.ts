import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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
  },
  eventName: {
    maxWidth: '434.733px',
    wordWrap: 'break-word',
  },
  logo: {
    width: '150px',
    height: '107px',
    marginTop: '28px',
  },
});

export default useStyles;
