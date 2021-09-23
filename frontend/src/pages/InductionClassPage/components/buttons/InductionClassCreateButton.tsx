import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

const InductionClassCreateButton = () => {
  const history = useHistory();

  return (
    <Button
      positive
      secondary
      onClick={() => history.push(ROUTES.INDUCTION_CLASS_CREATE)}
    >
      Create Induction Class
    </Button>
  );
};

export default InductionClassCreateButton;
