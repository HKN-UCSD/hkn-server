const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '8vh',
    },
    [theme.breakpoints.only('xs')]: {
      marginTop: '3vh',
    },
  },
  logo: {
    minWidth: '98px',
    minHeight: '70px',
    width: '14vh',
    height: '10vh',
  },
  cardContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

export default styles;
