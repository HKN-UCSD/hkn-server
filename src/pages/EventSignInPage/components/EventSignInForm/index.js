import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import schema from './schema';

import { MajorDropdownField } from '@SharedComponents';

const INITIAL_INPUT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  major: '',
  hknAffiliation: '',
  consentForPhotos: '',
};

const EventSignInForm = props => {
  const { handleSubmit, classes } = props;

  return (
    <Formik
      initialValues={INITIAL_INPUT_VALUES}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction='column' justify='center' spacing={3}>
            <Grid item>
              <Grid
                container
                className={classes.nameFields}
                direction='row'
                spacing={3}
              >
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
                    className={classes.vertField}
                    component={TextField}
                    fullWidth
                    name='email'
                    label='Email Address (UCSD)'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                className={classes.majorAndGradDate}
                direction='row'
                spacing={3}
              >
                <Grid item xs={8}>
                  <MajorDropdownField name='major' label='Major' />
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
                Sign In For Event
              </Button>
            </Grid>

            {isSubmitting && <LinearProgress />}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

EventSignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default EventSignInForm;
