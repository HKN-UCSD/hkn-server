import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Card } from '@material-ui/core';
import { formatISO } from 'date-fns';

import useStyles from './styles';
import {
  InitialValuesType,
  InductionClassEditForm,
} from './components/InductionClassEditForm';

import * as ROUTES from '@Constants/routes';
import {
  getInductionClassByQuarter,
  updateInductionClass,
} from '@Services/InductionClassService';
import {
  InductionClassResponse,
  InductionClassUpdateRequest,
} from '@Services/api';
import { useRequest } from '@Hooks';
import { Loading, RequestErrorSnackbar } from '@SharedComponents';

interface InductionClassQuarter {
  quarter: string;
}

function InductionClassEditPage(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const { quarter } = useParams<InductionClassQuarter>();
  const { data, isLoading, error, isError } = useRequest<
    InductionClassResponse,
    Response
  >({
    requestKey: `getInductionClass_${quarter}`,
    requestFunc: getInductionClassByQuarter,
    requestParams: [quarter],
  });

  const handleSubmit = async (
    values: InductionClassUpdateRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    await updateInductionClass(quarter, values);
    setSubmitting(false);
    history.push(ROUTES.INDUCTION_CLASS_DETAILS_WITH_QTR(quarter));
  };

  const handleCancel = () => {
    history.push(ROUTES.INDUCTION_CLASS_GENERAL);
  };

  const ReturnedComponent = () => {
    if (isError && error !== null) {
      return <RequestErrorSnackbar error={error} isError />;
    }

    if (isLoading || data === undefined) {
      return <Loading />;
    }

    const { name, startDate, endDate, interviewDates } = data;
    let initialValues: InitialValuesType = {
      name,
      startDate,
      endDate,
      interviewStartDateWeekOne: formatISO(new Date()),
      interviewStartDateWeekTwo: formatISO(new Date()),
    };

    if (interviewDates !== undefined) {
      initialValues = {
        ...initialValues,
        interviewStartDateWeekOne: interviewDates[0],
        interviewStartDateWeekTwo: interviewDates[1],
      };
    }

    return (
      <Card className={classes.root}>
        <InductionClassEditForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          initialInductionClassValues={initialValues}
          quarter={quarter}
        />
      </Card>
    );
  };

  return <ReturnedComponent />;
}

export default InductionClassEditPage;
