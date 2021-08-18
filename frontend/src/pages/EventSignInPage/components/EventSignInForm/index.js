import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Checkbox } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router';

import schema from './schema';
import styles from './styles';

import {
  MajorDropdownField,
  AffiliateDropdownField,
  ButtonWithConfirmationModal,
} from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

const INITIAL_INPUT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  major: '',
  hknAffiliation: '',
  agreeToPhotoRelease: false,
};

const EventSignInForm = props => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const history = useHistory();
  const { classes, handleSubmit } = props;

  const handlePageSwitch = () => {
    history.push(ROUTES.SIGN_IN);
  };

  const handleNoPageSwitch = () => {
    setModalDisplay(false);
  };

  const confirmButtonProps = {
    name: 'Yes',
    onClick: handlePageSwitch,
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    onClick: handleNoPageSwitch,
    positive: true,
  };

  const checkEmail = checked => {
    setModalDisplay(checked);
  };

  return (
    <Formik
      initialValues={INITIAL_INPUT_VALUES}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await handleSubmit(values, checkEmail);
        setSubmitting(false);
        resetForm({ values: '' });
      }}
    >
      {({ submitForm, isSubmitting, values: { agreeToPhotoRelease } }) => (
        <Form>
          <Grid container direction='column' justify='center' spacing={3}>
            {modalDisplay && (
              <ButtonWithConfirmationModal
                confirmationModalProps={{
                  title: 'Account Detected',
                  contentText:
                    'Looks like you have an HKN account, please sign in through the portal',
                  confirmButtonProps,
                  cancelButtonProps,
                }}
                name='Sign in error'
                primary
                negative
              />
            )}
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
                className={classes.signInButton}
                variant='contained'
                color='primary'
                fullWidth
                disabled={!agreeToPhotoRelease || isSubmitting}
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

export default withStyles(styles)(EventSignInForm);
