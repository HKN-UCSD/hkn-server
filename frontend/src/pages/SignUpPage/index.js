import React from 'react';
import { Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from './components/SignUpForm';
import styles from './styles';

import { Card } from '@SharedComponents';
import { PublicPageLayout } from '@SharedComponents/layouts';
import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { createNewUser } from '@Services/AuthService';
import {
  doSignInWithEmailAndPassword,
  doSendVerificationEmail,
  doSignOut,
} from '@Services/auth';

const INITIAL_STATE = {};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = async (values, setSubmitting) => {
    const { email, firstName, lastName, major, gradYear, password } = values;
    const signupSubmission = {
      email,
      firstName,
      lastName,
      major,
      password,
      graduationYear: gradYear.toString(),
    };

    try {
      await createNewUser(signupSubmission);
    } catch {
      console.log('Create new user failed');
      setSubmitting(false);
      return;
    }

    try {
      await doSignInWithEmailAndPassword(email, password, false);
    } catch {
      console.log('Sign in failed');
      setSubmitting(false);
      return;
    }

    try {
      await doSendVerificationEmail();
    } catch {
      console.log('Send verification email failed.');
    }

    await doSignOut();
    setSubmitting(false);
    alert('You have successfully signed up for an account.');
  };

  render() {
    const { classes } = this.props;

    return (
      <PublicPageLayout>
        <Card className={classes.card}>
          <Grid
            container
            className={classes.cardContent}
            alignItems='center'
            direction='column'
            spacing={2}
          >
            <Grid item>
              <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
            </Grid>
            <Grid item>
              <SignUpForm handleSubmit={this.handleSubmit} />
            </Grid>
          </Grid>
        </Card>
      </PublicPageLayout>
    );
  }
}

export default withStyles(styles)(SignUpPage);
