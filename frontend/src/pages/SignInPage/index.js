import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import * as ROUTES from '@Constants/routes';
import * as LOGO_URL from '@Images/hkn-trident.png';
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  doSendVerificationEmail,
  doPasswordReset,
  getCurrentUserClaims,
} from '@Services/auth';
import { ClaimsSingleton } from '@Services/claims';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: '112px',
    height: '80px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  signin: {
    marginTop: theme.spacing(3),
  },
  forgotPassword: {
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    float: 'right',
    marginTop: theme.spacing(1),
  },
  signupFooter: {
    marginTop: theme.spacing(3),
    textTransform: 'none',
    textAlign: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  signupLink: {
    textDecoration: 'none',
  },
  footer: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  footerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

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
};

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { history } = this.props;
    this.listener = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser && authUser.isEmailVerified) {
        history.push(ROUTES.HOME);
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleSignIn = event => {
    const { email, password, checked } = this.state;
    const { history } = this.props;

    doSignInWithEmailAndPassword(email, password, checked)
      .then(() => {
        return getCurrentUserClaims();
      })
      .then(claims => {
        return ClaimsSingleton.setClaims(claims);
      })
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          history.push(ROUTES.HOME);
        } else {
          doSignOut();

          this.setState({
            verifyEmailDialogOpen: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          failedSignInDialogOpen: true,
          signInError: error,
        });
      });

    event.preventDefault();
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleForgotPasswordEmailChange = event => {
    this.setState({ forgotPasswordEmail: event.target.value });
  };

  handleFailedSignInDialogClose = () => {
    this.setState({
      failedSignInDialogOpen: false,
      password: '',
    });
  };

  handleVerifyEmailDialogClose = () => {
    this.setState({
      verifyEmailDialogOpen: false,
    });
    doSignOut();
  };

  handleResendVerificationEmail = () => {
    const { email, password, checked } = this.state;
    doSignInWithEmailAndPassword(email, password, checked).then(() =>
      doSendVerificationEmail()
        .then(() => {
          this.handleVerifyEmailDialogClose();
        })
        .catch(error => {
          doSignOut();
          this.setState({
            verifyEmailError: error,
            failedSendVerificationEmailDialogOpen: true,
          });
        })
    );
  };

  handleCheckRemember = event => {
    this.setState({ checked: event.target.checked });
  };

  handleForgotPassword = () => {
    this.setState({
      forgotPasswordDialogOpen: true,
    });
  };

  handleForgotPasswordConfirm = () => {
    const { forgotPasswordEmail } = this.state;

    doPasswordReset(forgotPasswordEmail)
      .then(() => {
        this.setState({
          successfulForgotPasswordConfirmDialogOpen: true,
          forgotPasswordDialogOpen: false,
        });
      })
      .catch(error => {
        this.setState({
          forgotPasswordConfirmError: error,
          failedForgotPasswordConfirmDialogOpen: true,
          forgotPasswordDialogOpen: false,
        });
      });
  };

  handleForgotPasswordDialogClose = () => {
    this.setState({
      forgotPasswordDialogOpen: false,
      forgotPasswordEmail: '',
    });
  };

  handleSuccessfulForgotPasswordConfirmDialogClose = () => {
    this.setState({
      successfulForgotPasswordConfirmDialogOpen: false,
    });
  };

  handleFailedForgotPasswordConfirmDialogClose = () => {
    this.setState({
      forgotPasswordConfirmError: null,
      failedForgotPasswordConfirmDialogOpen: false,
      forgotPasswordDialogOpen: true,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      checked,
      failedSignInDialogOpen,
      signInError,
      verifyEmailDialogOpen,
      failedSendVerificationEmailDialogOpen,
      verifyEmailError,
      failedForgotPasswordConfirmDialogOpen,
      forgotPasswordConfirmError,
      successfulForgotPasswordConfirmDialogOpen,
      forgotPasswordDialogOpen,
      forgotPasswordEmail,
    } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />

        {/* Main Sign In Form */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} src={LOGO_URL} />
          <Typography component='h1' variant='h5'>
            HKN Portal Login
          </Typography>

          {/* Sign In Form */}
          <form className={classes.form} onSubmit={this.handleSignIn}>
            {/* Email Field */}
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input
                id='email'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={this.handleEmailChange}
                value={email}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handlePasswordChange}
                value={password}
              />
            </FormControl>

            {/* Remember Me Check Box */}
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  onChange={this.handleCheckRemember}
                  checked={checked}
                />
              }
              label='Remember me'
            />

            {/* Forgot Password button */}
            <Button
              size='small'
              variant='text'
              onClick={this.handleForgotPassword}
              className={classes.forgotPassword}
            >
              Forgot password?
            </Button>

            {/* Sign In Button */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.signin}
            >
              Sign in
            </Button>
          </form>
        </Paper>

        {/* Create an account - SIGN UP */}
        <div className={classes.signupFooter}>
          <Typography component='p' style={{ display: 'inline-block' }}>
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className={classes.signupLink}>
              Sign up
            </Link>
          </Typography>
        </div>

        {/* Footer Element */}
        <Typography className={classes.footer} variant='caption' gutterBottom>
          <a
            className={classes.footerLink}
            href='http://hkn.ucsd.edu'
            target='_blank'
            rel='noopener noreferrer'
          >
            &copy; 2019 Eta Kappa Nu UCSD
          </a>
        </Typography>

        {/* Failure and Success Dialogues */}
        <div>
          {/* Failed Sign In */}
          <Dialog
            open={failedSignInDialogOpen}
            onClose={this.handleFailedSignInDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {signInError ? signInError.message : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleFailedSignInDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>

          {/* Verify Email before Sign In */}
          <Dialog
            open={verifyEmailDialogOpen}
            onClose={this.handleVerifyEmailDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Welcome</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                You must verify your email address before you can sign in. Press
                RESEND if you did not receive the verification email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleResendVerificationEmail}
                color='primary'
              >
                RESEND
              </Button>
              <Button
                onClick={this.handleVerifyEmailDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>

          {/* Failed to send Verification Email */}
          <Dialog
            open={failedSendVerificationEmailDialogOpen}
            onClose={this.handleFailedSendVerificationEmailDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {verifyEmailError
                  ? `${verifyEmailError.message}You can click RESEND below to resend the verification email.` +
                    `If this issue persists, please contact a HKN officer.`
                  : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onCLick={this.handleResendVerificationEmail}
                color='primary'
              >
                RESEND
              </Button>
              <Button
                onClick={this.handleFailedSendVerificationEmailDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>

          {/* Forgot Password Unsuccessful */}
          <Dialog
            open={failedForgotPasswordConfirmDialogOpen}
            onClose={this.handleFailedForgotPasswordConfirmDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {forgotPasswordConfirmError
                  ? forgotPasswordConfirmError.message
                  : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleFailedForgotPasswordConfirmDialogClose}
                color='primary'
              >
                BACK
              </Button>
            </DialogActions>
          </Dialog>

          {/* Forgot Password Success */}
          <Dialog
            open={successfulForgotPasswordConfirmDialogOpen}
            onClose={this.handleSuccessfulForgotPasswordConfirmDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                A link to reset password has been sent to your email address.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSuccessfulForgotPasswordConfirmDialogClose}
                color='primary'
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>

          {/* Forgot Password Prompt */}
          <Dialog
            open={forgotPasswordDialogOpen}
            onClose={this.handleForgotPasswordDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Forgot password</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                To reset your password, please enter your email address below.
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='forgotPasswordEmailField'
                label='Email Address'
                type='email'
                fullWidth
                onChange={this.handleForgotPasswordEmailChange}
                value={forgotPasswordEmail}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleForgotPasswordDialogClose}
                color='primary'
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleForgotPasswordConfirm}
                color='primary'
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    );
  }
}

export default compose(withStyles(styles), withRouter)(SignInPage);
