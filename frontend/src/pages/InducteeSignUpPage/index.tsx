import React from 'react';
import { Avatar, Grid } from '@material-ui/core';

import { SignUpForm } from './components/SignUpForm';
import useStyles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Card, PublicPageLayout } from '@SharedComponents';

import { createNewUser } from '@Services/AuthService';
import {
  doSignInWithEmailAndPassword,
  doSendVerificationEmail,
  doSignOut,
} from '@Services/auth';
import { AppUserSignupRequest } from '@Services/api/models';

function InducteeSignUpPage(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = async (
    values: AppUserSignupRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    const signupSubmission = {
      ...values,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      major: values.major,
      graduationYear: values.graduationYear.toString(),
      password: values.password,
      preferredName: values.preferredName,
      pronoun: values.pronoun,
      customPronoun: values.customPronoun,
      infoSession: values.infoSession,
      courseRequirement: values.courseRequirement,
      newsletter: values.newsletter,
    };
    try {
      await createNewUser(signupSubmission);
    } catch {
      console.log('Create new user failed');
      setSubmitting(false);
      return;
    }

    try {
      await doSignInWithEmailAndPassword(values.email, values.password, false);
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
          <p> Congratulation!</p>
          <Grid item >
            <SignUpForm handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}
export default InducteeSignUpPage;