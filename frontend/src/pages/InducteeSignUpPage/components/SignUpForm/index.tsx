import React from 'react';
import { useHistory } from 'react-router';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import useStyles from './styles';
import schema from './schema';

import FOUR_YEAR_PLAN from '@Images/4_year_plan.png';
import * as ROUTES from '@Constants/routes';
import { DESCRIPTION_TEXT } from '@Constants/descriptions';
import {
  Button,
  MajorDropdownField,
  YearDropdownField,
  PronounDropdownField,
  InfoSessionDropdownField,
  Link,
} from '@SharedComponents';

import { AppUserSignupRequest } from '@Services/api/models';

interface InitialValuesType {
  email: string;
  password: string;
  confirmPW: string;
  firstName: string;
  lastName: string;
  major: string;
  graduationYear: string;
  preferredName: string;
  pronoun: string;
  customPronoun: string;
  infoSession: string;
  courseRequirement: boolean;
  newsletter: boolean;
}

const INITIAL_INPUT_BOX_VALUES: InitialValuesType = {
  email: '',
  password: '',
  confirmPW: '',
  firstName: '',
  lastName: '',
  major: '',
  graduationYear: '',
  preferredName: '',
  pronoun: '',
  customPronoun: '',
  infoSession: '',
  courseRequirement: false,
  newsletter: false,
};

interface SignUpFormProps {
  handleSubmit: (
    values: AppUserSignupRequest,
    setSubmitting: (_: boolean) => void
  ) => void;
}

export const SignUpForm = (props: SignUpFormProps) => {
  const { handleSubmit } = props;
  const history = useHistory();
  const classes = useStyles();
  const descriptionHTML = document.createElement('div');
  descriptionHTML.innerHTML = DESCRIPTION_TEXT;

  return (
    <Formik
      initialValues={INITIAL_INPUT_BOX_VALUES}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting, values: { pronoun, courseRequirement, newsletter } }) => (
        <Form>
          <Grid container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={2}
            className={classes.main}>
            <Grid item>
              <Typography>Congratulations! You&apos;ve been selected to induct to Eta Kappa Nu (HKN), the Official Honor Society of IEEE. We are so happy to see that you are interested in inducting. <br /><br />
                Please fill out this form to begin your induction process. There is no risk in filling out this form (you can opt-out at any time by unsubscribing or ignoring the emails), but it is mandatory for you to fill out this form in order to induct! <br /><br />
                *Contact us* <br />
                HKN @ UCSD <br />
                hkn@eng.ucsd.edu <br />
                <Link href='https://hkn.ucsd.edu' openInNewTab /> <br />
                <Link href='https://www.facebook.com/hknucsd/' openInNewTab /> <br />
                <Link href='https://discord.gg/UWZ5FD8' openInNewTab /> <br />
              </Typography>
            </Grid>
            <Grid item>
              <Typography> {DESCRIPTION_TEXT}</Typography></Grid>
            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    name='firstName'
                    label='First Name'
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    name='lastName'
                    label='Last Name'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Field
                component={TextField}
                fullWidth
                name='preferredName'
                label='Preferred Name'
              />
            </Grid>

            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item xs={6}>
                  <PronounDropdownField
                    name='pronoun'
                    label='Pronoun'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    disabled={!(pronoun === 'Custom')}
                    name='customPronoun'
                    label='Pronoun (custom)'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Field
                component={TextField}
                fullWidth
                name='email'
                label='Email Address'
              />
            </Grid>

            <Grid item>
              <Field
                component={TextField}
                fullWidth
                name='password'
                type='password'
                label='Password'
              />
            </Grid>

            <Grid item>
              <Field
                component={TextField}
                fullWidth
                name='confirmPW'
                type='password'
                label='Confirm Password'
              />
            </Grid>

            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item xs={8}>
                  <MajorDropdownField
                    name='major'
                    label='Major'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <YearDropdownField
                    name='graduationYear'
                    label='Grad Year'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <InfoSessionDropdownField
                name='infoSession'
                label='Select an info session to attend'
                fullWidth
              />
            </Grid>

            <Grid item>
              <h3>Review your coursework</h3>
			  <Typography>The HKN induction process requires you to pass an interview involving technical questions in the following quarter, so we recommend that inductees have completed their major&apos;s 2nd year Fall Quarter courses in order to induct (following the most updated 4-year course plans). You can find the four-year-plan at <Link href='https://plans.ucsd.edu/' openInNewTab /> </Typography>
              <Typography>Please confirm that you have completed or are completing your classes for Fall of sophomore year according to UCSD 4-year plan (sample coursework below).</Typography>
            </Grid>
            <Grid item>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                checked
                name="courseRequirement"
                Label={{
                  label: 'I confirm.'
                }} />
            </Grid>
            <Grid item>
              <img
                className={classes.logo}
                src={FOUR_YEAR_PLAN}
                alt='Coursework Requirements'
              />
            </Grid>


            <Grid item>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="newsletter"
                Label={{ label: "I understand that I am subscribing to HKN's newsletter." }}
              />
            </Grid>


            <Grid item>
              <Button
                className={classes.signUp}
                primary
                positive
                fullWidth
                disabled={!courseRequirement || !newsletter || isSubmitting}
                onClick={submitForm}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item>
              <Grid container justify='center'>
                <Button
                  className={classes.signInRedirect}
                  onClick={() => {
                    history.push(ROUTES.SIGN_IN);
                  }}
                >
                  Have an Account Already?
                </Button>
              </Grid>
            </Grid>

            {isSubmitting && <LinearProgress />}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};