import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
}));

export default useStyles;
