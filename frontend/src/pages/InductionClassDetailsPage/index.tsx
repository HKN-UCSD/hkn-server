import React from 'react';
import { useParams } from 'react-router-dom';

import InductionClassDetailsComponent from './components/InductionClassDetailsComponent';

import { Card, Loading, RequestErrorSnackbar } from '@SharedComponents';
import { useRequest } from '@Hooks';
import { getInductionClassByQuarter } from '@Services/InductionClassService';
import { InductionClassResponse } from '@Services/api';

interface InductionClassQuarter {
  quarter: string;
}

function InductionClassDetailsPage(): JSX.Element {
  const { quarter } = useParams<InductionClassQuarter>();
  const { data, isLoading, error, isError } = useRequest<
    InductionClassResponse,
    Response
  >({
    requestKey: `getInductionClass_${quarter}`,
    requestFunc: getInductionClassByQuarter,
    requestParams: [quarter],
  });

  const ReturnedComponent = () => {
    if (isError && error !== null) {
      return <RequestErrorSnackbar error={error} isError />;
    }

    if (isLoading || data === undefined) {
      return <Loading />;
    }

    return (
      <Card>
        <InductionClassDetailsComponent inductionClass={data} />
      </Card>
    );
  };

  return <ReturnedComponent />;
}

export default InductionClassDetailsPage;
