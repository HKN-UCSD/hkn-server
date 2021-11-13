const styles = theme => ({
  main: {
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '8vh',
    },
    [theme.breakpoints.only('xs')]: {
      marginTop: '3vh',
    },
  },
});

export default styles;