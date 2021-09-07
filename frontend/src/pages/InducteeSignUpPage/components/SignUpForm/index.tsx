import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import { TextField, Checkbox } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import useStyles from './styles';
import schema from './schema';

import FOUR_YEAR_PLAN from '@Images/4_year_plan.png';
import * as ROUTES from '@Constants/routes';
import {
  MajorDropdownField,
  YearDropdownField,
  PronounDropdownField,
  InfoSessionDropdownField,
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
  const classes = useStyles();

  return (
    <Formik
      initialValues={INITIAL_INPUT_BOX_VALUES}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting, values: { pronoun } }) => (
        <Form>
          <Grid container direction='column' justify='center' spacing={2}>
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
                    disabled={!(pronoun === 'customPronoun')}
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
              <h3>Review your coursework</h3>
              <Typography>Description.</Typography>
            </Grid>
            <Grid item>
              <img
                className={classes.logo}
                src={FOUR_YEAR_PLAN}
                alt='Coursework Requirements'
              />
            </Grid>
            <Grid item>
              <Grid container direction='row' alignItems='center'>
                <Grid item xs={1}>
                  <Field
                    type='checkbox'
                    component={Checkbox}
                    name='courseRequirement'
                    color='primary'
                  />
                </Grid>
                <Grid item>
                  <Typography>I understand</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <h3>Select an info session</h3>
            </Grid>

            <Grid item>
              <InfoSessionDropdownField
                name='infoSession'
                label='Info Session'
                fullWidth
              />
            </Grid>

            <Grid item>
              <h3>Buddy related (TBD)</h3>
            </Grid>

            <Grid item>
              <h3>Description</h3>
            </Grid>
            <Grid item>
              <Grid container direction='row' alignItems='center'>
                <Grid item xs={1}>
                  <Field
                    type='checkbox'
                    component={Checkbox}
                    name='newsletter'
                    color='primary'
                  />
                </Grid>
                <Grid item>
                  <Typography>
                    I understand.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                className={classes.signUp}
                variant='contained'
                color='primary'
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item>
              <Grid container justify='center'>
                <Button
                  className={classes.signInRedirect}
                  to={ROUTES.SIGN_IN}
                  component={Link}
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