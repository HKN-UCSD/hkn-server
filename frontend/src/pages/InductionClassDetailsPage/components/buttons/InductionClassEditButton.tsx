import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

interface InductionClassEditButtonProps {
  quarter: string;
}

const InductionClassEditButton = ({
  quarter,
}: InductionClassEditButtonProps) => {
  const history = useHistory();

  return (
    <Button
      positive
      primary
      onClick={() =>
        history.push(ROUTES.INDUCTION_CLASS_EDIT_WITH_QTR(quarter))
      }
    >
      Edit
    </Button>
  );
};

export default InductionClassEditButton;
