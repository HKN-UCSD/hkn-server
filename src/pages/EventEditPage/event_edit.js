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
import MultiChipSelect from '../../components/MultiChipSelect';
import EVENT_TAGS from '../../constants/eventTags';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomPanel: {
    width: '80%',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '50px',
  },
  dateField: {
    margin: '15px',
    width: '40%',
  },
  field: {
    margin: '15px',
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  urls: {
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  controls: {
    margin: '20px',
  },
});

const schema = Yup.object({
  name: Yup.string().required('Required'),
  // startDateTime: Yup.string()
  //   .required('Required'),
  // endDateTime: Yup.string()
  //   .required('Required'),
  // .test('is-greater', 'end time should be greater', (value) => {
  //   const start = Yup.ref('startDate');
  //   console.log(start);
  //   return moment(value, "HH:mm").isAfter(moment(start, "HH:mm"));
  // }),
  hosts: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
});

const FormikMultiChipSelect = ({
  field: { name, value },
  form: { setFieldValue },
  ...props
}) => {
  const { label, className, selections } = props;
  return (
    <div className={className}>
      <MultiChipSelect
        label={label}
        selections={selections}
        value={value}
        onChange={e => setFieldValue(name, e.target.value)}
      />
    </div>
  );
};

FormikMultiChipSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.array,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FormikMultiChipSelect.defaultProps = {
  label: '',
  className: '',
};

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
      history.goBack();
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
              history.goBack();
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
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Save
                  </Button>

                  <Button
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
