import React from 'react';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import { SignInValues } from '../NewSignInPage';

import schema from './schema';

interface SignInFormProps {
  handleSubmit: (
    values: SignInValues,
    setSubmitting: (_: boolean) => void
  ) => void;
}

const initialValues: SignInValues = {
  email: '',
  password: '',
  keepSignedIn: false,
};

export const SignInForm = ({ handleSubmit }: SignInFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Field
                    component={TextField}
                    name='email'
                    label='Email Address'
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <Field
                    component={TextField}
                    name='password'
                    label='Password'
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <Field
                    component={CheckboxWithLabel}
                    name='keepSignedIn'
                    label='Keep me signed in'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                color='primary'
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>

          {isSubmitting && <LinearProgress />}
        </Form>
      )}
    </Formik>
  );
};
