const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  socialContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    borderCollapse: 'collapse',
    paddingLeft: '0',
  },
  socialSection: {
    display: 'flex',
    justifyContent: 'space-inbetween',
    alignItems: 'center',
    margin: '0 0 20px 0',
    padding: '0'
  },
  socialButton: {
    width: '25%',
    margin: '0 3px 0 3px',
    padding: '0',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;
