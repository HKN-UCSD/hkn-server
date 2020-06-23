import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button, Grid, LinearProgress, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import ELIGIBLE_MAJORS from '../../constants/eligibleMajors';
import styles from './styles';

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

const graduationYearDropdownChoices = () => {
  const yearChoices = [];

  for (let year = 0; year <= MAX_GRAD_YEAR - MIN_GRAD_YEAR; year += 1) {
    yearChoices.push(year + MIN_GRAD_YEAR);
  }

  return yearChoices;
};

const createFullMajorTitle = (department, major) => {
  let fullMajorTitle = '';

  if (ELIGIBLE_MAJORS[department][major] === 'Computer Engineering') {
    if (department === 'CSE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - CSE`;
    else if (department === 'ECE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - ECE`;
  } else fullMajorTitle = ELIGIBLE_MAJORS[department][major];

  return fullMajorTitle;
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
                  component={TextField}
                  select
                  fullWidth
                  name='major'
                  label='Major'
                >
                  {Object.keys(ELIGIBLE_MAJORS).map(department =>
                    Object.keys(ELIGIBLE_MAJORS[department]).map(major => {
                      const fullMajorTitle = createFullMajorTitle(
                        department,
                        major
                      );
                      return (
                        <MenuItem value={fullMajorTitle}>
                          {fullMajorTitle}
                        </MenuItem>
                      );
                    })
                  )}
                </Field>
              </Grid>

              <Grid item xs={4}>
                <Field
                  component={TextField}
                  select
                  fullWidth
                  name='gradYear'
                  label='Grad Year'
                >
                  {graduationYearDropdownChoices().map(year => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Field>
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
