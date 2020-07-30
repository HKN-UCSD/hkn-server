import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import { withStyles } from '@material-ui/core/styles';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';

import FormikChipListInput from './form_chip_list_input';
import FormikMultiChipSelect from './form_multi_chip_select';
import EVENT_TAGS from '../../../../constants/eventTags';
import styles from './styles';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  hosts: Yup.array().required('Required'),
  location: Yup.string().required('Required'),
  tags: Yup.array(),
  description: Yup.string(),
});

const EventEditForm = props => {
  const { handleSubmit, handleCancel, classes, initialValues } = props;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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

                    <Field
                      className={classes.field}
                      name='hosts'
                      component={FormikChipListInput}
                      fullWidth
                      label='Hosts'
                    />

                    <Field
                      className={classes.field}
                      name='location'
                      type='text'
                      component={TextField}
                      fullWidth
                      label='Location'
                    />

                    <Field
                      className={classes.field}
                      name='tags'
                      component={FormikMultiChipSelect}
                      selections={Object.values(EVENT_TAGS)}
                      fullWidth
                      label='Tags'
                    />
                  </Grid>
                </Grid>

                <Grid className={classes.urls}>
                  {Object.keys(initialValues.urls).map(url => {
                    return (
                      <Field
                        key={url}
                        className={classes.field}
                        name={`urls.${url}`}
                        type='text'
                        component={TextField}
                        label={url.toUpperCase()}
                      />
                    );
                  })}
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
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    hosts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      fb: PropTypes.string.isRequired,
      canva: PropTypes.string.isRequired,
      rsvp: PropTypes.string.isRequired,
      signin: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(EventEditForm);
