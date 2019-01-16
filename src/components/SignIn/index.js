import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { withFirebase } from '../Firebase'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

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
        width: '96px',
        height: '64px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    signin: {
        marginTop: theme.spacing.unit * 3,
    },
    forgotPassword: {
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "transparent"
        },
        float: "right",
        marginTop: theme.spacing.unit,
    },
    signupFooter: {
        marginTop: theme.spacing.unit * 3,
        textTransform: 'none',
        textAlign: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    signupLink: {
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
    email: '',
    password: '',
    forgotPasswordEmail: '',
    checked: false,
    signInError: null,
    verifyEmailError: null,
    failedSignInDialogOpen: false,
    verifyEmailDialogOpen: false,
    failedSendVerificationEmailDialogOpen: false,
    forgotPasswordDialogOpen: false,
    successfulForgotPasswordConfirmDialogOpen: false,
    failedForgotPasswordConfirmDialogOpen: false,
    forgotPasswordConfirmError: null,
}

class SignInPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            if (authUser && authUser.isEmailVerified) { this.props.history.push(ROUTES.HOME) }
        })
    }

    componentWillUnmount() {
        this.listener()
    }

    handleSignIn = event => {
        const { email, password } = this.state

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password, this.state.checked)
            .then(() => {
                if (this.props.firebase.auth.currentUser.emailVerified) {
                    this.props.history.push(ROUTES.HOME)
                } else {
                    this.props.firebase.doSignOut()
        
                    this.setState({
                        verifyEmailDialogOpen: true,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    failedSignInDialogOpen: true,
                    signInError: error,
                })
            })

        event.preventDefault()
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    }

    handleForgotPasswordEmailChange = event => {
        this.setState({ forgotPasswordEmail: event.target.value })
    }

    handleFailedSignInDialogClose = event => {
        this.setState({
            failedSignInDialogOpen: false,
            password: '',
        })
    }

    handleVerifyEmailDialogClose = event => {
        this.setState({
            verifyEmailDialogOpen: false,
        })
        this.props.firebase.doSignOut()
    }

    handleResendVerificationEmail = event => {
        this.props.firebase
            .doSendVerificationEmail()
            .then(() => {
                this.handleVerifyEmailDialogClose()
            })
            .catch(error => {
                this.setState({
                    verifyEmailError: error,
                    emailVerificationDialogOpen: false,
                    failedSendVerificationEmailDialogOpen: true,
                })
            })
    }

    handleCheckRemember = event => {
        this.setState({ checked: event.target.checked })
    }

    handleForgotPassword = event => {
        this.setState({
            forgotPasswordDialogOpen: true,
        })
    }

    handleForgotPasswordConfirm = event => {
        this.props.firebase
            .doPasswordReset(this.state.forgotPasswordEmail)
            .then(() => {
                this.setState({
                    successfulForgotPasswordConfirmDialogOpen: true,
                    forgotPasswordDialogOpen: false,
                })
            })
            .catch(error => {
                this.setState({
                    forgotPasswordConfirmError: error,
                    failedForgotPasswordConfirmDialogOpen: true,
                    forgotPasswordDialogOpen: false,
                })
            })
    }

    handleForgotPasswordDialogClose = () => {
        this.setState({
            forgotPasswordDialogOpen: false,
            forgotPasswordEmail: '',
        })
    }

    handleSuccessfulForgotPasswordConfirmDialogClose = () => {
        this.setState({
            successfulForgotPasswordConfirmDialogOpen: false,
        })
    }

    handleFailedForgotPasswordConfirmDialogClose = () => {
        this.setState({
            forgotPasswordConfirmError: null,
            failedForgotPasswordConfirmDialogOpen: false,
            forgotPasswordDialogOpen: true,
        })
    }

    render() {
        return (
            <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar} src={require('../../images/hkn-logo-black.png')} />
                    <Typography component="h1" variant="h5">
                        Member Portal Login
                    </Typography>
                    <form className={this.props.classes.form} onSubmit={this.handleSignIn}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleEmailChange.bind(this)} value={this.state.email} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onChange={this.handleCheckRemember.bind(this)} checked={this.state.checked} />}
                            label="Remember me"
                        />
                        <Button
                            size="small"
                            variant="empty"
                            onClick={this.handleForgotPassword}
                            className={this.props.classes.forgotPassword}>
                            Forgot password?
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.signin}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
                <div className={this.props.classes.signupFooter}>
                    <Typography component="p" style={{ display: 'inline-block' }}>
                        Don't have an account?  <Link to={ROUTES.SIGN_UP} className={this.props.classes.signupLink}>Sign up</Link>
                    </Typography>
                </div>
                <Typography
                    className={this.props.classes.footer}
                    variant="caption"
                    gutterBottom
                >
                    <a className={this.props.classes.footerLink} href={"http://hkn.ucsd.edu"} target="_blank"> &copy; 2019 Eta Kappa Nu UCSD </a>
                </Typography>
                <div>
                    <Dialog
                        open={this.state.failedSignInDialogOpen}
                        onClose={this.handleFailedSignInDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.signInError ? this.state.signInError.message : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleFailedSignInDialogClose} color="primary" autoFocus>
                                GOT IT
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.verifyEmailDialogOpen}
                        onClose={this.handleVerifyEmailDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Welcome</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You must verify your email address before you can sign in. Press RESEND if you did not receive the verification email.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleResendVerificationEmail} color="primary">
                                RESEND
                            </Button>
                            <Button onClick={this.handleVerifyEmailDialogClose} color="primary" autoFocus>
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
                            <Button onCLick={this.handleResendVerificationEmail} color="primary">
                                RESEND
                            </Button>
                            <Button onClick={this.handleFailedSendVerificationEmailDialogClose} color="primary" autoFocus>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.failedForgotPasswordConfirmDialogOpen}
                        onClose={this.handleFailedForgotPasswordConfirmDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.forgotPasswordConfirmError ? this.state.forgotPasswordConfirmError.message : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleFailedForgotPasswordConfirmDialogClose} color="primary">
                                BACK
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.successfulForgotPasswordConfirmDialogOpen}
                        onClose={this.handleSuccessfulForgotPasswordConfirmDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                A link to reset password has been sent to your email address.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSuccessfulForgotPasswordConfirmDialogClose} color="primary">
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.forgotPasswordDialogOpen}
                        onClose={this.handleForgotPasswordDialogClose}
                        aria-labelledby="alert-dialog-title"
                    >
                        <DialogTitle id="alert-dialog-title">{"Forgot password"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                To reset your password, please enter your email address below.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="forgotPasswordEmailField"
                                label="Email Address"
                                type="email"
                                fullWidth
                                onChange={this.handleForgotPasswordEmailChange.bind(this)}
                                value={this.state.forgotPasswordEmail}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleForgotPasswordDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleForgotPasswordConfirm} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </main>
        )
    }
}

SignInPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), withFirebase, withRouter)(SignInPage)