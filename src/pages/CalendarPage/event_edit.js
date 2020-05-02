import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { fieldToTextField, TextField } from 'formik-material-ui';
import MuiTextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import { Button, LinearProgress } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import * as Yup from 'yup';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  field: {
    margin: '10px',
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const CustomTextField = params => {
  return (
    <MuiTextField fullWidth multiline rows={4} {...fieldToTextField(params)} />
  );
};

const schema = Yup.object({
  eventName: Yup.string().required('Required'),
  // startDateTime: Yup.string()
  //   .required('Required'),
  // endDateTime: Yup.string()
  //   .required('Required'),
  // .test('is-greater', 'end time should be greater', (value) => {
  //   const start = Yup.ref('startTime');
  //   console.log(start);
  //   return moment(value, "HH:mm").isAfter(moment(start, "HH:mm"));
  // }),
  hosts: Yup.string().required('Required'),
});

const EventEdit = props => {
  const {
    classes,
    location: { state },
  } = props;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Formik
        initialValues={{ ...state }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <div className={classes.container}>
              <div className={classes.dates}>
                <Field
                  className={classes.field}
                  component={DateTimePicker}
                  name='startTime'
                  label='Start Time'
                />

                <Field
                  className={classes.field}
                  component={DateTimePicker}
                  name='endTime'
                  label='End Time'
                />
              </div>

              <Field
                className={classes.field}
                name='eventName'
                type='text'
                component={TextField}
                label='Event Name'
              />

              <Field
                className={classes.field}
                name='hosts'
                type='text'
                component={TextField}
                label='Hosts'
              />

              <Field
                className={classes.field}
                name='description'
                type='text'
                component={CustomTextField}
                label='Description'
              />

              {isSubmitting && <LinearProgress />}

              <Button
                variant='contained'
                color='primary'
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

EventEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
};

export default withStyles(styles)(EventEdit);
