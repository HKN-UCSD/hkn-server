import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

interface InductionClassDetailsButtonProps {
  quarter: string;
}

const InductionClassDetailsButton = ({
  quarter,
}: InductionClassDetailsButtonProps) => {
  const history = useHistory();

  return (
    <Button
      positive
      primary
      onClick={() =>
        history.push(ROUTES.INDUCTION_CLASS_DETAILS_WITH_QTR(quarter))
      }
    >
      Edit Role
    </Button>
  );
};

export default InductionClassDetailsButton;
