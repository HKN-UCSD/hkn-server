import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import styles from './styles';
import schema from './schema';

import * as ROUTES from '@Constants/routes';
import { MajorDropdownField, YearDropdownField } from '@SharedComponents';

const INITIAL_INPUT_BOX_VALUES = {
  email: '',
  password: '',
  confirmPW: '',
  firstName: '',
  lastName: '',
  major: '',
  gradYear: '',
};

const SignUpForm = props => {
  const { handleSubmit, classes } = props;

  return (
    <Formik
      initialValues={INITIAL_INPUT_BOX_VALUES}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction='column' justify='center' spacing={3}>
            <Grid item>
              <Grid container direction='row' spacing={3}>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name='firstName'
                    label='First Name'
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name='lastName'
                    label='Last Name'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='column' spacing={3}>
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
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row' spacing={3}>
                <Grid item xs={8}>
                  <MajorDropdownField name='major' label='Major' />
                </Grid>

                <Grid item xs={4}>
                  <YearDropdownField name='gradYear' label='Grad Year' />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                className={classes.signUpButton}
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

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignUpForm);
