import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import schema from './schema';
import styles from './styles';

import { MajorDropdownField, AffiliateDropdownField } from '@SharedComponents';

const INITIAL_INPUT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  major: '',
  hknAffiliation: '',
  agreeToPhotoRelease: false,
};

const EventRsvpForm = props => {
  const { classes, handleSubmit } = props;

  return (
    <Formik
      initialValues={INITIAL_INPUT_VALUES}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting);
        resetForm({ values: '' });
      }}
    >
      {({ submitForm, isSubmitting, values: { agreeToPhotoRelease } }) => (
        <Form>
          <Grid container direction='column' justify='center' spacing={3}>
            <Grid item>
              <Grid container direction='row' spacing={3}>
                <Grid item xs={6}>
                  <Field
                    component={TextField}
                    name='firstName'
                    label='First Name'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
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
              <Grid container direction='column' spacing={3}>
                <Grid item>
                  <Field
                    component={TextField}
                    fullWidth
                    name='email'
                    label='Email Address (UCSD)'
                  />
                </Grid>

                <Grid item>
                  <MajorDropdownField
                    name='major'
                    label='Major'
                    includeOthers
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <AffiliateDropdownField
                    name='hknAffiliation'
                    label='Affiliation with HKN'
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <Grid container direction='row' alignItems='center'>
                    <Grid item xs={1}>
                      <Field
                        type='checkbox'
                        component={Checkbox}
                        name='agreeToPhotoRelease'
                        color='primary'
                      />
                    </Grid>

                    <Grid item>
                      <Typography>
                        I hereby accept the following{' '}
                        <a
                          href='somewhere'
                          target='_blank'
                          rel='noreferrer noopener'
                          style={{ textDecoration: 'none', color: '#1c54b2' }}
                        >
                          photo release agreement
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                className={classes.rsvpButton}
                variant='contained'
                color='primary'
                fullWidth
                disabled={!agreeToPhotoRelease || isSubmitting}
                onClick={submitForm}
              >
                RSVP For Event
              </Button>
            </Grid>

            {isSubmitting && <LinearProgress />}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

EventRsvpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(EventRsvpForm);
