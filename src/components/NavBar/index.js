import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
} from '@material-ui/core';

import SignOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

import { AuthUserContext } from '@Src/contexts';
import { isOfficer as checkIsOfficer } from '@Services/claims';
import { doSignOut } from '@Services/auth';
import { OfficerTabs, InducteeTabs } from './tabs';
import styles from './styles';

const INITIAL_STATES = {
  isDrawerOpen: false,
  isOfficer: false,
  isConfirmationModalOpen: false,
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    const userClaims = this.context;
    this.setState({
      isOfficer: checkIsOfficer(userClaims),
    });
  }

  handleDrawerToggle = () => {
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  };

  handleLogOut = () => {
    this.setState({
      isConfirmationModalOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isConfirmationModalOpen: false,
    });
  };

  render() {
    const { classes, children } = this.props;
    const { isDrawerOpen, isOfficer, isConfirmationModalOpen } = this.state;

    const tabs = isOfficer ? OfficerTabs : InducteeTabs;
    const tabComponents = tabs.map(tab => (
      <ListItem button component={Link} to={tab.route} key={tab.route}>
        <ListItemIcon>{tab.icon}</ListItemIcon>
        <ListItemText primary={tab.text} />
      </ListItem>
    ));

    const drawer = (
      <>
        <List>{tabComponents}</List>
        <Divider />
        <List>
          <ListItem button onClick={this.handleLogOut}>
            <ListItemIcon>
              <SignOutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>

        <Dialog
          open={isConfirmationModalOpen}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Log Out?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={doSignOut} color='primary'>
              Yes
            </Button>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar disableGutters>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
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
        <nav className={classes.drawer}>
          <Hidden mdUp implementation='css'>
            <Drawer
              container={window.document.body}
              variant='temporary'
              anchor='left'
              open={isDrawerOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              <Toolbar />
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </div>
    );
  }
}

NavBar.contextType = AuthUserContext;

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default compose(withStyles(styles))(NavBar);
