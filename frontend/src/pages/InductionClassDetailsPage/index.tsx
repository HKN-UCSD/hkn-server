import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import InductionClassDetailsComponent from './components/InductionClassDetailsComponent';

import { Card, Loading, RequestErrorSnackbar } from '@SharedComponents';
import { useRequest } from '@Hooks';
import { getInductionClassByQuarter } from '@Services/InductionClassService';
import { InductionClassResponse } from '@Services/api';

interface InductionClassQuarter {
  quarter: string;
}

function InductionClassDetailsPage(): JSX.Element {
  const [showInducteeList, setShowInducteeList] = useState(false);
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
      <>
        <Card>
          <InductionClassDetailsComponent
            inductionClass={data}
            displayInductees={showInducteeList}
          >
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
          </InductionClassDetailsComponent>
        </Card>
      </>
    );
  };

  return <ReturnedComponent />;
}

export default InductionClassDetailsPage;
