import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button, Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import MajorDropdown from '../Dropdowns/MajorDropdown';
import YearDropdown from '../Dropdowns/YearDropdown';

const MIN_GRAD_YEAR = 2005;
const MAX_GRAD_YEAR = moment().year() + 4;
const PW_MIN_LENGTH = 4;

const schema = Yup.object({
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .required('Required'),
  password: Yup.string()
    .min(PW_MIN_LENGTH, 'Your password is too short!')
    .required('Required'),
  confirmPW: Yup.string().when('password', {
    is: value => value && value.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
      .required('Required'),
  }),
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  major: Yup.string()
    .min(2, 'Your major is too short!')
    .required('Required'),
  gradYear: Yup.number().required('Required'),
});

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
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction='column'>
            <Grid
              container
              className={classes.nameFields}
              direction='row'
              spacing={3}
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

            <Grid container direction='column'>
              <Field
                className={classes.vertField}
                component={TextField}
                name='email'
                label='Email Address'
              />

              <Field
                className={classes.vertField}
                component={TextField}
                name='password'
                type='password'
                label='Password'
              />

              <Field
                className={classes.vertField}
                component={TextField}
                name='confirmPW'
                type='password'
                label='Confirm Password'
              />
            </Grid>

            <Grid
              container
              className={classes.majorAndGradDate}
              direction='row'
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

            <Button
              variant='contained'
              color='primary'
              fullWidth
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Sign Up
            </Button>
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
