import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  LinearProgress,
  Grid,
  TextField as MuiTextField,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import schema from './schema';

import { InductionClassUpdateRequest } from '@Services/api';
import { inductionClassDateFormat } from '@Constants/dateTimeFormat';

export interface InitialValuesType {
  name: string;
  startDate: string;
  endDate: string;
  interviewStartDateWeekOne: string;
  interviewStartDateWeekTwo: string;
}

interface InductionClassEditFormProps {
  handleSubmit: (
    values: InductionClassUpdateRequest,
    setSubmitting: (_: boolean) => void
  ) => void;
  handleCancel: () => void;
  initialInductionClassValues: InitialValuesType;
  quarter: string;
}

export const InductionClassEditForm = (props: InductionClassEditFormProps) => {
  const {
    handleSubmit,
    handleCancel,
    initialInductionClassValues,
    quarter,
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={initialInductionClassValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          const {
            name,
            startDate,
            endDate,
            interviewStartDateWeekOne,
            interviewStartDateWeekTwo,
          } = values;

          const valuesToSubmit: InductionClassUpdateRequest = {
            name,
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
                        <MuiTextField
                          label='Quarter'
                          defaultValue={quarter}
                          disabled
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
                          Update Induction Class
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
