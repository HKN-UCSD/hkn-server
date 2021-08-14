import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  cardItem: {
    marginTop: '25px',
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: `${theme.spacing(1)}px`,
    margin: `0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
  },
  qrCode: {
    marginTop: `${theme.spacing(1.5)}px`,
  },
}));

export default useStyles;
