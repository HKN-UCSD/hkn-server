import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button, Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

import { Formik, Field, Form } from 'formik';

import styles from './styles';
import VALIDATION_SCHEMA from './schema';
import { MajorDropdown, YearDropdown } from '../dropdowns';

const MIN_GRAD_YEAR = 2005;
const MAX_GRAD_YEAR = moment().year() + 4;

const INITIAL_INPUT_BOX_VALUES = {
  email: '',
  password: '',
  confirmPW: '',
  firstname: '',
  lastname: '',
  major: '',
  gradYear: '',
};

const SignUpForm = props => {
  const { handleSubmit, classes } = props;

  return (
    <Formik
      initialValues={INITIAL_INPUT_BOX_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction='column' spacing={3}>
            <Grid
              container
              className={classes.nameFields}
              direction='row'
              spacing={3}
              item
            >
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name='firstname'
                  label='First Name'
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={TextField}
                  name='lastname'
                  label='Last Name'
                />
              </Grid>
            </Grid>

            <Grid container direction='column' item spacing={3}>
              <Grid item>
                <Field
                  className={classes.vertField}
                  component={TextField}
                  fullWidth
                  name='email'
                  label='Email Address'
                />
              </Grid>

              <Grid item>
                <Field
                  className={classes.vertField}
                  component={TextField}
                  fullWidth
                  name='password'
                  type='password'
                  label='Password'
                />
              </Grid>

              <Grid item>
                <Field
                  className={classes.vertField}
                  component={TextField}
                  fullWidth
                  name='confirmPW'
                  type='password'
                  label='Confirm Password'
                />
              </Grid>
            </Grid>

            <Grid
              container
              className={classes.majorAndGradDate}
              direction='row'
              item
              spacing={3}
            >
              <Grid item xs={8}>
                <Field
                  component={MajorDropdown}
                  fullWidth
                  name='major'
                  label='Major'
                />
              </Grid>

              <Grid item xs={4}>
                <Field
                  component={YearDropdown}
                  minyear={MIN_GRAD_YEAR}
                  maxyear={MAX_GRAD_YEAR}
                  fullWidth
                  name='gradYear'
                  label='Grad Year'
                />
              </Grid>
            </Grid>

            {isSubmitting && <LinearProgress />}

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
