import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import { withStyles } from '@material-ui/core/styles';
import { Button, LinearProgress } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';

import FormikMultiChipSelect from './form_multi_chip_select';
import EVENT_TAGS from '../../constants/eventTags';
import styles from './styles';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  hosts: Yup.string().required('Required'),
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
            <div className={classes.root}>
              <div className={classes.topPanel}>
                <div className={classes.left}>
                  <div className={classes.dates}>
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
                  </div>

                  <div className={classes.details}>
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
                      type='text'
                      component={TextField}
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
                  </div>
                </div>

                <div className={classes.urls}>
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
                </div>
              </div>

              <div className={classes.bottomPanel}>
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
              </div>

              {isSubmitting && <LinearProgress />}

              <div className={classes.controls}>
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

EventEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(EventEditForm);
