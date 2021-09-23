import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';

import InductionClassEditButton from '../buttons/InductionClassEditButton';
import InductionClassDeleteButton from '../buttons/InductionClassDeleteButton';
import InductionClassAffiliateTable from '../InductionClassAffiliateTable';

import { InductionClassResponse } from '@Services/api';
import { inductionClassDateFormat } from '@Constants/dateTimeFormat';
import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

interface InductionClassDetailsComponentProps {
  inductionClass: InductionClassResponse;
}

function InductionClassDetailsComponent({
  inductionClass,
}: InductionClassDetailsComponentProps): JSX.Element {
  const [showInducteeList, setShowInducteeList] = useState(false);
  const history = useHistory();

  const {
    name,
    quarter,
    startDate,
    endDate,
    interviewDates,
    affiliates,
  } = inductionClass;
  const affiliatesToDisplay = affiliates === undefined ? [] : affiliates;

  const interviewDatesString = interviewDates
    ?.map(interviewDate =>
      format(parseISO(interviewDate), inductionClassDateFormat)
    )
    .reduce((acc, val) => `${acc}, ${val}`);
  const interviewDatesToDisplay =
    interviewDatesString === undefined ? '' : interviewDatesString;

  const RenderedInducteeList = () =>
    showInducteeList ? (
      <InductionClassAffiliateTable affiliates={affiliatesToDisplay} />
    ) : (
      <></>
    );

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Grid container direction='row'>
          <Grid item xs>
            <Grid container direction='row' spacing={2}>
              <Grid item>
                <Typography variant='h4'>Induction Class Details</Typography>
              </Grid>

              <Grid item>
                <Button
                  secondary
                  negative
                  onClick={() => history.push(ROUTES.INDUCTION_CLASS_GENERAL)}
                >
                  Back To Induction Class Page
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction='row'
              spacing={1}
              justifyContent='flex-end'
            >
              <Grid item>
                <InductionClassDeleteButton quarter={quarter} />
              </Grid>

              <Grid item>
                <InductionClassEditButton quarter={quarter} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction='row'>
          <Grid item xs>
            <Typography variant='h6'>
              Name: <Typography>{`${name}`}</Typography>
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant='h6'>
              Quarter: <Typography>{`${quarter}`}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction='row'>
          <Grid item xs>
            <Typography variant='h6'>
              Start Date:{' '}
              <Typography>
                {format(parseISO(startDate), inductionClassDateFormat)}
              </Typography>
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant='h6'>
              End Date:{' '}
              <Typography>
                {format(parseISO(endDate), inductionClassDateFormat)}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant='h6'>
          Interview Start Dates (By Week):{' '}
          <Typography>{interviewDatesToDisplay}</Typography>
        </Typography>
      </Grid>

      <Grid item>
        <Grid container direction='column'>
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='h6'>List Of Inductees:</Typography>
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='showInducteeList'
                      onChange={() => setShowInducteeList(!showInducteeList)}
                      checked={showInducteeList}
                    />
                  }
                  label='Show List'
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <RenderedInducteeList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InductionClassDetailsComponent;
