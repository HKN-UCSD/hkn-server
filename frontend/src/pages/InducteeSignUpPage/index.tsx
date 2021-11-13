import React from 'react';
import { useLocation, useParams, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { Avatar, Grid } from '@material-ui/core';

import { SignUpForm } from './components/SignUpForm';
import useStyles from './styles';

import { config } from '@Config';
import * as ROUTES from '@Constants/routes';
import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Card, PublicPageLayout } from '@SharedComponents';
import { createNewInducteeUser } from '@Services/AuthService';
import {
  doSignInWithEmailAndPassword,
  doSendVerificationEmail,
  doSignOut,
} from '@Services/auth';
import { AppUserSignupRequest } from '@Services/api/models';

interface URLAdder {
  urlAdderOne: string;
}

function InducteeSignUpPage(): JSX.Element {
  const classes = useStyles();
  const { urlAdderOne } = useParams<URLAdder>();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const { code } = queryParams;

  if (urlAdderOne !== config.urlAdderOne || code !== config.urlAdderTwo) {
    return <Redirect to={ROUTES.HOME} />;
  }

  const handleSubmit = async (
    values: AppUserSignupRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    const signupSubmission = {
      ...values,
      graduationYear: values.graduationYear.toString(),
    };
    const { email, password } = values;

    try {
      await createNewInducteeUser(signupSubmission);
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

  return (
    <PublicPageLayout>
      <Card>
        <Grid
          container
          className={classes.cardContent}
          alignItems='center'
          direction='column'
          spacing={2}
        >
          <Grid item >
            <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
          </Grid>
          <h2> INDUCTEE SIGN UP </h2>
          <Grid item >
            <SignUpForm handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}
export default InducteeSignUpPage;