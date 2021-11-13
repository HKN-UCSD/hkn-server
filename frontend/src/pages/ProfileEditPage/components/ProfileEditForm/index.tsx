import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress, Grid } from '@material-ui/core';

import schema from './schema';

import {
  MajorDropdownField,
  YearDropdownField,
  InfoSessionDropdownField,
  PronounDropdownField,
} from '@SharedComponents';
import { AppUserPostRequest } from '@Services/api';

import { getYear } from 'date-fns';

interface UneditableValues {
  email: string;
}

export interface InitialValuesType {
  firstName: string;
  lastName: string;
  major: string;
  graduationYear: number;
  preferredName: string;
  pronoun: string;
  customPronoun: string;
  infoSession: string;
}

interface ProfileEditFormProps {
  handleSubmit: (
    values: AppUserPostRequest,
    setSubmitting: (_: boolean) => void
  ) => void;
  handleCancel: () => void;
  initialProfileValues: InitialValuesType;
  uneditableValues: UneditableValues;
}

export const ProfileEditForm = (props: ProfileEditFormProps) => {
  const {
    handleSubmit,
    handleCancel,
    initialProfileValues,
    uneditableValues,
  } = props;

  return (
    <Formik
      initialValues={initialProfileValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        const valuesToSubmit: AppUserPostRequest = {
          ...values,
          graduationYear: values.graduationYear.toString(),
          ...uneditableValues,
        };

        handleSubmit(valuesToSubmit, setSubmitting);
      }}
    >
      {({ submitForm, isSubmitting, values: { pronoun } }) => (
        <Form>
          <Grid container direction='row' spacing={2}>
            <Grid item xs>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs>
                      <Field
                        component={TextField}
                        name='firstName'
                        label='First Name'
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <Field
                        component={TextField}
                        name='lastName'
                        label='Last Name'
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs>
                      <MajorDropdownField
                        name='major'
                        label='Major'
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <YearDropdownField
                        name='graduationYear'
                        label='Graduation Year'
                        minYear = {getYear(new Date()) - 10}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs>
                      <Field
                        component={TextField}
                        name='preferredName'
                        label='Preferred Name'
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <InfoSessionDropdownField
                        name='infoSession'
                        label='Info Session'
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs>
                      <PronounDropdownField
                        name='pronoun'
                        label='Pronoun'
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <Field
                        component={TextField}
                        name='customPronoun'
                        label='Custom Pronoun'
                        disabled={!(pronoun === 'Custom')}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={2} justifyContent='flex-end'>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='secondary'
                        disabled={isSubmitting}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Update Your Information
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isSubmitting && <LinearProgress />}
        </Form>
      )}
    </Formik>
  );
};
