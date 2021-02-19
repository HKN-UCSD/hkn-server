import { Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '8vh',
    },
    [theme.breakpoints.only('xs')]: {
      marginTop: '3vh',
    },
  },
  children: {
    margin: theme.spacing(2),
  },
});

export default styles;
