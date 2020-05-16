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
import moment from 'moment';

import { getEventDetails, setEventDetails } from '../../services/events';
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

class EventEdit extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { eventId },
      },
    } = props;
    this.state = { eventId, initialValues: {}, loading: true };
  }

  componentDidMount() {
    const { eventId } = this.state;

    getEventDetails(eventId).then(event => {
      const initialValues = {
        startDate: moment(event.startDate).toDate(),
        endDate: moment(event.endDate).toDate(),
        ...event,
      };
      this.setState({ initialValues, loading: false });
    });
  }

  render() {
    const { history, classes } = this.props;

    const { eventId, initialValues, loading } = this.state;

    const onCancel = () => {
      // history.push(`/event/${eventId}`); // Waiting for event detail page
      history.goBack(); // TODO Remove!
    };

    if (loading) {
      return <LinearProgress />;
    }

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            const submission = {
              startDate: values.startDate.toString(),
              endDate: values.endDate.toString(),
              ...values,
            };
            setEventDetails(eventId, submission).then(() => {
              setSubmitting(false);
              // history.push(`/event/${eventId}`); // Waiting for event detail page
              history.goBack(); // TODO Remove!
            });
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
                    onClick={onCancel}
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
  }
}

EventEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(EventEdit);
