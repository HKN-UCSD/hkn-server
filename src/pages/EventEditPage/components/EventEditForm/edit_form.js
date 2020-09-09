import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';

import EventTypeDropdownField from '../EventTypeDropdownField';
import EventStatusDropdownField from '../EventStatusDropdownField';

import styles from './styles';

import { OfficerNameAutocomplete } from '@SharedComponents';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  hosts: Yup.array().required('Required'),
  location: Yup.string().required('Required'),
  type: Yup.string(),
  status: Yup.string().required('Required'),
  description: Yup.string(),
  fbURL: Yup.string(),
  canvaURL: Yup.string(),
  rsvpURL: Yup.string(),
  signInURL: Yup.string(),
});

const EventEditForm = props => {
  const { handleSubmit, handleCancel, classes, initialValues } = props;
  const { fbURL, canvaURL, rsvpURL, signInURL } = initialValues;
  const urls = { fbURL, canvaURL, rsvpURL, signInURL };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container direction='column' wrap='wrap'>
              <Grid container>
                <Grid
                  container
                  className={classes.left}
                  direction='column'
                  item
                  xs={6}
                >
                  <Grid container className={classes.dates} wrap='wrap'>
                    <Field
                      className={classes.dateField}
                      component={DateTimePicker}
                      name='startDate'
                      label='Start Date'
                    />

                    <Field
                      className={classes.dateField}
                      component={DateTimePicker}
                      name='endDate'
                      label='End Date'
                    />
                  </Grid>

                  <Grid container direction='column'>
                    <Field
                      className={classes.field}
                      name='name'
                      type='text'
                      component={TextField}
                      fullWidth
                      label='Event Name'
                    />

                    <Grid item className={classes.field}>
                      <EventTypeDropdownField
                        name='type'
                        label='Type'
                        fullWidth
                      />
                    </Grid>

                    <Grid item className={classes.field}>
                      <EventStatusDropdownField
                        name='status'
                        label='Status'
                        fullWidth
                      />
                    </Grid>

                    <Grid item className={classes.field}>
                      <OfficerNameAutocomplete
                        name='hosts'
                        label='Hosts'
                        fullWidth
                      />
                    </Grid>

                    <Field
                      className={classes.field}
                      name='location'
                      type='text'
                      component={TextField}
                      fullWidth
                      label='Location'
                    />
                  </Grid>
                </Grid>

                <Grid className={classes.urls}>
                  {Object.keys(urls).map(url => (
                    <Field
                      key={url}
                      className={classes.field}
                      name={`${url}`}
                      type='text'
                      component={TextField}
                      label={url}
                    />
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={10}>
                <Field
                  className={classes.field}
                  name='description'
                  type='text'
                  component={TextField}
                  fullWidth
                  multiline
                  rows={4}
                  label='Description'
                />
              </Grid>

              {isSubmitting && <LinearProgress />}

              <Grid container>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Save
                </Button>

                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                  disabled={isSubmitting}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

EventEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    hosts: PropTypes.array.isRequired,
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fbURL: PropTypes.string,
    canvaURL: PropTypes.string,
    rsvpURL: PropTypes.string.isRequired,
    signInURL: PropTypes.string.isRequired,
  }),
};

EventEditForm.defaultProps = {
  initialValues: {
    fbURL: '',
    canvaURL: '',
    type: '',
  },
};

export default withStyles(styles)(EventEditForm);
