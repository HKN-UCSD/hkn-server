import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AttachmentIcon from '@material-ui/icons/Attachment'
import SignOutIcon from '@material-ui/icons/ExitToApp'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import ReusmeContent from './resume'

const drawerWidth = 240

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
})

const INITIAL_STATES = {
    isDrawerOpen: false,
    currentContent: 'resume',
}

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATES }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                this.props.history.push(ROUTES.SIGN_IN)
            }
        })
    }

    componentWillUnmount() {
        this.listener()
    }

    handleDrawerOpen = () => {
        this.setState({ isDrawerOpen: true })
    }

    handleDrawerClose = () => {
        this.setState({ isDrawerOpen: false })
    }

    handleLogout = () => {
        this.props.firebase
            .doSignOut()
    }

    getCurrentContent = () => {
        switch(this.state.currentContent) {
            case 'resume':
                return <ReusmeContent />
            default:
                break
        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(this.props.classes.appBar, this.state.isDrawerOpen && this.props.classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.isDrawerOpen} className={this.props.classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                this.props.classes.menuButton,
                                this.state.isDrawerOpen && this.props.classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={this.props.classes.title}
                        >
                            Member Portal
                    </Typography>
                        {/* <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(this.props.classes.drawerPaper, !this.state.isDrawerOpen && this.props.classes.drawerPaperClose),
                    }}
                    open={this.state.isDrawerOpen}
                >
                    <div className={this.props.classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Resume" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {/* <ListItem button>
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem> */}
                        <ListItem button onClick={this.handleLogout}>
                            <ListItemIcon>
                                <SignOutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={this.props.classes.content}>
                    {this.getCurrentContent()}
                </main>
            </div>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
}

// const authCondition = authUser => !!authUser
export default compose(withStyles(styles), withFirebase)(HomePage)