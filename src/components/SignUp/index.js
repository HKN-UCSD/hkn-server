import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
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
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    signup: {
        marginTop: theme.spacing.unit * 3,
    },
    signinFooter: {
        marginTop: theme.spacing.unit,
        textTransform: 'none',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    signinLink: {
        textDecoration: 'none',
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
        var firstName = ''
        var lastName = ''
        var inductedClass = ''

        this.validatePasswords(password, confirmPassword)
            .then(isSame => {
                if (isSame) {
                    return this.props.firebase.validateMemberStatus(email)
                } else {
                    throw Error('Passwords do not match, please try again.')
                }
            })
            .then(docSnapshot => {
                if (!docSnapshot.exists) {
                    throw Error('This member portal is restricted for UCSD HKN members only. If you are a member, please contact us at hkn@ucsd.edu.')
                }

                return docSnapshot.data()
            })
            .then(data => {
                firstName = data.firstName
                lastName = data.lastName
                inductedClass = data.class

                return this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
            })
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.uid)
                    .set({
                        email,
                        firstName,
                        lastName,
                        class: inductedClass,
                    })
            })
            .then(() => {
                this.sendVerificationEmail()
            })
            .catch(error => {
                this.setState({
                    signupError: error,
                    failedSignUpDialogOpen: true,
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

    handleFailedSendVerificationEmailDialogClose = () => {
        this.setState({ failedSendVerificationEmailDialogOpen: false })
        this.props.firebase.doSignOut()
        this.props.history.push(ROUTES.SIGN_IN)
    }

    render() {
        return (
            <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={this.props.classes.form} onSubmit={this.handleSignUp}>
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
                            className={this.props.classes.signup}
                        >
                            Sign up
                        </Button>
                    </form>
                </Paper>
                <span className={this.props.classes.signinFooter}>
                    <Typography component="p">
                        Already have an account?
                    </Typography>
                    <Link className={this.props.classes.signinLink} to={ROUTES.SIGN_IN}>Sign In</Link>
                </span>
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
                </div>
            </main >
        )
    }
}

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles), withFirebase)(SignUpPage)