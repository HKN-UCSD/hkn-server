import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { formatISO } from 'date-fns';

import schema from './schema';

import {
  OfficerNameAutocomplete,
  EventTypeDropdownField,
} from '@SharedComponents';
import { OfficerNameData } from '@SharedComponents/autocomplete/OfficerNameAutocomplete';
import { EventTypeEnum } from '@Services/EventService';
import { EventRequest } from '@Services/api/models';

interface InitialValuesType {
  startDate: string;
  endDate: string;
  name: string;
  location: string;
  description: string;
  fbURL: string;
  canvaURL: string;
  type: EventTypeEnum | undefined;
  hosts: OfficerNameData[];
}

const INITIAL_VALUES: InitialValuesType = {
  startDate: formatISO(new Date()),
  endDate: formatISO(new Date()),
  name: '',
  type: EventTypeEnum.Social,
  hosts: [],
  location: '',
  description: '',
  fbURL: '',
  canvaURL: '',
};

interface EventCreationFormProps {
  handleSubmit: (
    values: EventRequest,
    setSubmitting: (_: boolean) => void
  ) => void;
  handleCancel: () => void;
}

export const EventCreationForm = (props: EventCreationFormProps) => {
  const { handleSubmit, handleCancel } = props;
  const urlObjects = [
    {
      name: 'fbURL',
      label: 'Facebook URL',
    },
    {
      name: 'canvaURL',
      label: 'Canva URL',
    },
  ];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container direction='row' spacing={2}>
              <Grid item xs>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Field
                      component={TextField}
                      name='name'
                      label='Event Name'
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <EventTypeDropdownField
                      name='type'
                      label='Type'
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <Field
                      name='location'
                      component={TextField}
                      label='Location'
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <Grid container direction='row' spacing={2}>
                      <Grid item xs>
                        <Field
                          component={DateTimePicker}
                          name='startDate'
                          label='Start Date'
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs>
                        <Field
                          component={DateTimePicker}
                          name='endDate'
                          label='End Date'
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container spacing={2}>
                        {urlObjects.map(urlObject => {
                          const { name, label } = urlObject;

                          return (
                            <Grid item xs key={name}>
                              <Field
                                name={name}
                                component={TextField}
                                label={label}
                                fullWidth
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Field
                        name='description'
                        component={TextField}
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                      />
                    </Grid>
                  </Grid>

                  <Grid item>
                    <OfficerNameAutocomplete
                      name='hosts'
                      label='Hosts'
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <Grid container spacing={2} justify='flex-end'>
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
                          Create New Event
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
    </MuiPickersUtilsProvider>
  );
};
