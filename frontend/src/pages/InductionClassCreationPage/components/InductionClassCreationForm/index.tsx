import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, LinearProgress, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { formatISO } from 'date-fns';

import schema from './schema';

import { InductionClassRequest } from '@Services/api';
import { inductionClassDateFormat } from '@Constants/dateTimeFormat';

interface InductionClassCreationFormProps {
  handleSubmit: (
    values: InductionClassRequest,
    setSubmitting: (_: boolean) => void
  ) => void;
  handleCancel: () => void;
}

interface InitialValuesType {
  name: string;
  quarter: string;
  startDate: string;
  endDate: string;
  interviewStartDateWeekOne: string;
  interviewStartDateWeekTwo: string;
}

const INITIAL_VALUES: InitialValuesType = {
  name: '',
  quarter: '',
  startDate: formatISO(new Date()),
  endDate: formatISO(new Date()),
  interviewStartDateWeekOne: formatISO(new Date()),
  interviewStartDateWeekTwo: formatISO(new Date()),
};

export const InductionClassCreationForm = (
  props: InductionClassCreationFormProps
) => {
  const { handleSubmit, handleCancel } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          const {
            name,
            quarter,
            startDate,
            endDate,
            interviewStartDateWeekOne,
            interviewStartDateWeekTwo,
          } = values;

          const valuesToSubmit: InductionClassRequest = {
            name,
            quarter,
            startDate,
            endDate,
            interviewDates: [
              interviewStartDateWeekOne,
              interviewStartDateWeekTwo,
            ],
          };

          handleSubmit(valuesToSubmit, setSubmitting);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container direction='row' spacing={2}>
              <Grid item xs>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Grid container direction='row' spacing={2}>
                      <Grid item xs>
                        <Field
                          component={TextField}
                          name='name'
                          label='Name'
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs>
                        <Field
                          component={TextField}
                          name='quarter'
                          label='Quarter'
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container direction='row' spacing={2}>
                      <Grid item xs>
                        <Field
                          component={DatePicker}
                          name='startDate'
                          label='Start Date'
                          format={inductionClassDateFormat}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs>
                        <Field
                          component={DatePicker}
                          name='endDate'
                          label='End Date'
                          format={inductionClassDateFormat}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container direction='row' spacing={2}>
                      <Grid item xs>
                        <Field
                          component={DatePicker}
                          name='interviewStartDateWeekOne'
                          label='Interview Start Date (Week 1)'
                          format={inductionClassDateFormat}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs>
                        <Field
                          component={DatePicker}
                          name='interviewStartDateWeekTwo'
                          label='Interview Start Date (Week 2)'
                          format={inductionClassDateFormat}
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
                          Create Induction Class
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
