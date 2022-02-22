import React from 'react';
import { format, parseISO } from 'date-fns';

import InductionClassDetailsButton from '../buttons/InductionClassDetailsButton';

import { Loading, RequestErrorSnackbar, Table } from '@SharedComponents';
import { useRequest } from '@Hooks';
import { getMultipleInductionClasses } from '@Services/InductionClassService';
import {
  MultipleInductionClassResponse,
  InductionClassResponse,
} from '@Services/api';
import { inductionClassDateFormat } from '@Constants/dateTimeFormat';

// I copied this directly from the induction class table
const inductionClassResponseToInductionClassRow = ({
  name,
  quarter,
  startDate,
  endDate,
}: InductionClassResponse) => {
  const startDateCorrectFormat = format(
    parseISO(startDate),
    inductionClassDateFormat
  );
  const endDateCorrectFormat = format(
    parseISO(endDate),
    inductionClassDateFormat
  );

  const inductionClassRow = {
    name,
    quarter,
    startDate: startDateCorrectFormat,
    endDate: endDateCorrectFormat,
  };

  return inductionClassRow;
};

function MemberTable(): JSX.Element {
  const { data, isLoading, error, isError } = useRequest<
    MultipleInductionClassResponse,
    Response
  >({
    requestKey: 'getMultipleInductionClasses',
    requestFunc: getMultipleInductionClasses,
    requestParams: [{ showAffiliates: false }],
  });

  const columns = [
    { title: 'Quarter', field: 'quarter' },
    { title: 'Name', field: 'name' },
    { title: 'Start Date', field: 'startDate' },
    { title: 'End Date', field: 'endDate' },
    {
      title: '',
      render: ({ quarter }: InductionClassResponse) => (
        <InductionClassDetailsButton quarter={quarter} />
      ),
    },
  ];

  const ComponentToRender = () => {
    if (isError && error !== null) {
      return <RequestErrorSnackbar isError error={error} />;
    }

    if (isLoading || data === undefined) {
      return <Loading />;
    }

    const { inductionClasses } = data;
    const inductionClassData = inductionClasses.map(inductionClass =>
      inductionClassResponseToInductionClassRow(inductionClass)
    );

    return (
      <Table
        columns={columns}
        data={inductionClassData}
        title=''
        options={{ exportButton: true }}
        pageSize={5}
      />
    );
  };

  return <ComponentToRender />;
}

export default MemberTable;
