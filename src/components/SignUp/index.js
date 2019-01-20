import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from "react-router"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        width: '112px',
        height: '80px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    signup: {
        marginTop: theme.spacing.unit * 3,
    },
    signinFooter: {
        marginTop: theme.spacing.unit * 3,
        textTransform: 'none',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    signinLink: {
        textDecoration: 'none',
    },
    footer: {
        marginTop: theme.spacing.unit * 3,
        textAlign: 'center',
    },
    footerLink: {
        textDecoration: 'none',
        color: 'inherit',
    }
})

const INITIAL_STATE = {
    successfulSignUpDialogOpen: false,
    failedSignUpDialogOpen: false,
    failedSendVerificationEmailDialogOpen: false,
    email: '',
    password: '',
    confirmPassword: '',
    signupError: null,
    verifyEmailError: null,
    isSignUpButtonDisabled: false,
    whitelistDialogOpen: false,
}

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    validatePasswords = (password, confirmPassword) =>
        new Promise((resolve, reject) => {
            resolve(password === confirmPassword)
        })

    handleSignUp = async event => {
        const { email, password, confirmPassword } = this.state

        this.setState({
            isSignUpButtonDisabled: true,
        })

        this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.sendVerificationEmail()
                this.props.firebase.doSignOut()
            })
            .catch(error => {
                this.setState({
                    signupError: error,
                    failedSignUpDialogOpen: true,
                })
            })
            .finally(() => {
                this.setState({
                    isSignUpButtonDisabled: false,
                })
            })

        event.preventDefault()
    };

    sendVerificationEmail = () => {
        this.props.firebase
            .doSendVerificationEmail()
            .then(() => {
                this.setState({ successfulSignUpDialogOpen: true })
            })
            .catch(error => {
                this.setState({ failedSendVerificationEmailDialogOpen: true })
            })
    }

    handleResendVerificationEmail = () => {
        this.setState({ failedSendVerificationEmailDialogOpen: false })
        this.sendVerificationEmail()
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    }

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value })
    }

    handleSuccessfulSignUpDialogClose = () => {
        this.setState({ ...INITIAL_STATE })
        this.props.firebase.doSignOut()
        this.props.history.push(ROUTES.SIGN_IN)
    }
    handleFailedSignUpDialogClose = () => {
        this.setState({
            failedSignUpDialogOpen: false,
            email: '',
            password: '',
            confirmPassword: '',
        })
    }

    handleWhitelistDialogClose = () => {
        this.setState({
            whitelistDialogOpen: false,
        })
    }

    handleFailedSendVerificationEmailDialogClose = () => {
        this.setState({ failedSendVerificationEmailDialogOpen: false })
        this.props.firebase.doSignOut()
        this.props.history.push(ROUTES.SIGN_IN)
    }

    handleSubmitSignUp = event => {
        this.setState({
            whitelistDialogOpen: true
        })

        event.preventDefault()   
    }

    handleWhitelistConfirm = event => {
        this.handleWhitelistDialogClose()
        this.handleSignUp()
    }

    render() {
        return (
            <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar} src={require('../../images/hkn-trident.png')} />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={this.props.classes.form} onSubmit={this.handleSubmitSignUp}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleEmailChange.bind(this)} value={this.state.email} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input id="password" type="password" name="password" autoComplete="current-password" onChange={this.handleConfirmPasswordChange.bind(this)} value={this.state.confirmPassword} />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.state.isSignUpButtonDisabled}
                            className={this.props.classes.signup}
                        >
                            Sign up
                        </Button>
                    </form>
                </Paper>
                <span className={this.props.classes.signinFooter}>
                    <Typography component="p" style={{display: 'inline-block'}}>
                        Already have an account? <Link className={this.props.classes.signinLink} to={ROUTES.SIGN_IN}>Sign In</Link>
                    </Typography>
                </span>
                <Typography
                    className={this.props.classes.footer}
                    variant="caption"
                    gutterBottom
                >
                    <a className={this.props.classes.footerLink} href={"http://hkn.ucsd.edu"} target="_blank" rel="noopener noreferrer"> &copy; 2019 Eta Kappa Nu UCSD </a>
                </Typography>
                <div>
                    <Dialog
                        open={this.state.successfulSignUpDialogOpen}
                        onClose={this.handleSuccessfulSignUpDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                A confirmation email has been sent to your email address. You must verify your email before you can sign in.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSuccessfulSignUpDialogClose} color="primary" autoFocus>
                                GOT IT
            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.failedSignUpDialogOpen}
                        onClose={this.handleFailedSignUpDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.signupError ? this.state.signupError.message : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleFailedSignUpDialogClose} color="primary" autoFocus>
                                GOT IT
            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.failedSendVerificationEmailDialogOpen}
                        onClose={this.handleFailedSendVerificationEmailDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.verifyEmailError ? this.state.verifyEmailError.message + 'You can click RESEND below to resend the verification email. If this issue persists, please contact a HKN officer.' : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onCLick={this.handleResendVerificationEmail} color="secondary">
                                RESEND
                            </Button>
                            <Button onClick={this.handleFailedSendVerificationEmailDialogClose} color="primary" autoFocus>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.whitelistDialogOpen}
                        onClose={this.handleWhitelistDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Welcome"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This member portal is restricted for UCSD HKN members only. Accounts registered with emails not on our whitelist will be deleted automatically.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleWhitelistDialogClose} color="primary" autoFocus>
                                Cancel
                            </Button>
                            <Button onClick={this.handleWhitelistConfirm} color="primary" autoFocus>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </main >
        )
    }
}

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles), withFirebase)(SignUpPage)