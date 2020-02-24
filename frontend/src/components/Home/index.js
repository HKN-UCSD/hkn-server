import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import { compose } from 'recompose';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import { withFirebase } from '../../services/Firebase';
import ResumeContent from './resume';

import * as ROUTES from '../../constants/routes';
import * as HOME_CONTENTS from '../../constants/home';
import EventsPage from '../Events/events';
import PointsPage from '../Points';

import TotPoints from './totpoints';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const INITIAL_STATES = {
  isDrawerOpen: false,
  currentContent: '',
  isOfficer: false,
  isInductee: true,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };

    // this.checkIfOfficer = this.checkIfOfficer.bind(this);
  }

  componentDidMount() {
    const { firebase, history } = this.props;
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        history.push(ROUTES.SIGN_IN);
      } else {
        // console.log("authUser: "+authUser.uid)
        this.setState({
          currentContent: HOME_CONTENTS.EVENTS,
        });
        this.checkIfOfficer();
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  handleResume = () => {
    this.setState({ currentContent: HOME_CONTENTS.RESUME });
  };

  handleEventsPage = () => {
    this.setState({ currentContent: HOME_CONTENTS.EVENTS });
  };

  handlePointsPage = () => {
    this.setState({ currentContent: HOME_CONTENTS.POINTS });
  };

  handleProfile = () => {
    this.setState({ currentContent: HOME_CONTENTS.PROFILE });
  };

  handleTotalPoint = () => {
    this.setState({ currentContent: HOME_CONTENTS.TOTPOINT });
  };

  handleLogout = () => {
    const { firebase } = this.props;
    firebase.doSignOut();
  };

  getCurrentContent = () => {
    const { currentContent } = this.state;
    switch (currentContent) {
      case HOME_CONTENTS.RESUME:
        return <ResumeContent />;
      case HOME_CONTENTS.POINTS:
        return <PointsPage />;
      case HOME_CONTENTS.TOTPOINT:
        return <TotPoints />;
      case HOME_CONTENTS.EVENTS:
        return <EventsPage />;
      default:
        return null;
    }
  };

  checkIfOfficer = () => {
    const { firebase } = this.props;
    firebase
      .queryCurrentUserRole()
      .then(role => {
        if (role === 'Officer') {
          this.setState({
            isOfficer: true,
          });
        }
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, isOfficer } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={classNames(
            classes.appBar,
            isDrawerOpen && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!isDrawerOpen} className={classes.toolbar}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                isDrawerOpen && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              HKN Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !isDrawerOpen && classes.drawerPaperClose
            ),
          }}
          open={isDrawerOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={this.handleResume}>
              <ListItemIcon>
                <AttachmentIcon />
              </ListItemIcon>
              <ListItemText primary='Resume' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.handleEventsPage}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary='Get Involved' />
            </ListItem>
          </List>
          <Divider />
          {isOfficer ? (
            <div>
              <List>
                <ListItem button onClick={this.handleTotalPoint}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary='Total Points' />
                </ListItem>
              </List>
              <Divider />
            </div>
          ) : null}
          <List>
            <ListItem button onClick={this.handlePointsPage}>
              <ListItemIcon>
                <AssessmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Points' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.handleLogout}>
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>{this.getCurrentContent()}</main>
      </div>
    );
  }
}

export default compose(withStyles(styles), withFirebase)(HomePage);
