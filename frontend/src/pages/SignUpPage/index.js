import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import {
  Typography,
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as ROUTES from '../../constants/routes';
import * as LOGO_URL from '../../images/hkn-trident.png';

import {
  doCreateUserWithEmailAndPassword,
  doSignOut,
  doSendVerificationEmail,
} from '../../services/auth';

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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
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
  },
});

const INITIAL_STATE = {
  successfulSignUpDialogOpen: false,
  failedSignUpDialogOpen: false,
  failedSendVerificationEmailDialogOpen: false,
  email: '',
  password: '',
  confirmPassword: '',
  samePassword: true,
  signupError: null,
  verifyEmailError: null,
  isSignUpButtonDisabled: true,
  whitelistDialogOpen: false,
};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      this.setState({
        samePassword: false,
        isSignUpButtonDisabled: true,
      });
    } else {
      this.setState({
        samePassword: true,
        isSignUpButtonDisabled: false,
      });
    }

    if (password.length === 0) {
      this.setState({ isSignUpButtonDisabled: true });
    }
  };

  handleSignUp = async event => {
    const { email, password } = this.state;

    this.setState({
      isSignUpButtonDisabled: true,
    });

    doCreateUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then(() => {
        this.sendVerificationEmail();
        doSignOut();
      })
      .catch(error => {
        this.setState({
          signupError: error,
          failedSignUpDialogOpen: true,
        });
      })
      .finally(() => {
        this.setState({
          isSignUpButtonDisabled: false,
        });
      });

    event.preventDefault();
  };

  sendVerificationEmail = () => {
    doSendVerificationEmail()
      .then(() => {
        this.setState({ successfulSignUpDialogOpen: true });
      })
      .catch(() => {
        this.setState({ failedSendVerificationEmailDialogOpen: true });
      });
  };

  handleResendVerificationEmail = () => {
    this.setState({ failedSendVerificationEmailDialogOpen: false });
    this.sendVerificationEmail();
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    const { confirmPassword } = this.state;
    this.validatePasswords(event.target.value, confirmPassword);
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    const { password } = this.state;
    this.validatePasswords(password, event.target.value);
    this.setState({ confirmPassword: event.target.value });
  };

  handleSuccessfulSignUpDialogClose = () => {
    const { history } = this.props;
    this.setState({ ...INITIAL_STATE });
    doSignOut();
    history.push(ROUTES.SIGN_IN);
  };

  handleFailedSignUpDialogClose = () => {
    this.setState({
      failedSignUpDialogOpen: false,
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  handleWhitelistDialogClose = () => {
    this.setState({
      whitelistDialogOpen: false,
    });
  };

  handleFailedSendVerificationEmailDialogClose = () => {
    this.setState({ failedSendVerificationEmailDialogOpen: false });
    const { history } = this.props;
    doSignOut();
    history.push(ROUTES.SIGN_IN);
  };

  handleSubmitSignUp = event => {
    this.setState({
      whitelistDialogOpen: true,
    });

    event.preventDefault();
  };

  handleWhitelistConfirm = event => {
    this.handleWhitelistDialogClose();
    this.handleSignUp(event);
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      samePassword,
      confirmPassword,
      isSignUpButtonDisabled,
      successfulSignUpDialogOpen,
      signupError,
      failedSignUpDialogOpen,
      failedSendVerificationEmailDialogOpen,
      whitelistDialogOpen,
      verifyEmailError,
    } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} src={LOGO_URL} />
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmitSignUp}>
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
            <FormControl
              margin='normal'
              required
              fullWidth
              error={!samePassword}
            >
              <InputLabel htmlFor='password'>Confirm Password</InputLabel>
              <Input
                id='password'
                type='password'
                name='password'
                autoComplete='current-password'
                onChange={this.handleConfirmPasswordChange}
                value={confirmPassword}
              />
              {samePassword ? (
                ''
              ) : (
                <FormHelperText>Password Mismatch!</FormHelperText>
              )}
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={isSignUpButtonDisabled}
              className={classes.signup}
            >
              Sign up
            </Button>
          </form>
        </Paper>
        <span className={classes.signinFooter}>
          <Typography component='p' style={{ display: 'inline-block' }}>
            Already have an account?{' '}
            <Link className={classes.signinLink} to={ROUTES.SIGN_IN}>
              Sign In
            </Link>
          </Typography>
        </span>
        <Typography className={classes.footer} variant='caption' gutterBottom>
          <a
            className={classes.footerLink}
            href='http://hkn.ucsd.edu'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            &copy; 2019 Eta Kappa Nu UCSD{' '}
          </a>
        </Typography>
        <div>
          <Dialog
            open={successfulSignUpDialogOpen}
            onClose={this.handleSuccessfulSignUpDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                A confirmation email has been sent to your email address. You
                must verify your email before you can sign in.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSuccessfulSignUpDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={failedSignUpDialogOpen}
            onClose={this.handleFailedSignUpDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {signupError ? signupError.message : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleFailedSignUpDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
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
                  ? `${verifyEmailError.message}You can click RESEND below to resend the verification email. If this issue persists, please contact a HKN officer.`
                  : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onCLick={this.handleResendVerificationEmail}
                color='secondary'
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
          <Dialog
            open={whitelistDialogOpen}
            onClose={this.handleWhitelistDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Welcome</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                This member portal is restricted for UCSD HKN members only.
                Accounts registered with emails not on our whitelist will be
                deleted automatically.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleWhitelistDialogClose}
                color='primary'
                autoFocus
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleWhitelistConfirm}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    );
  }
}

export default compose(withRouter, withStyles(styles))(SignUpPage);
