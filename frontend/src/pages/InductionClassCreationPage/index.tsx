import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '@material-ui/core';

import useStyles from './styles';
import { InductionClassCreationForm } from './components/InductionClassCreationForm';

import * as ROUTES from '@Constants/routes';
import { createInductionClass } from '@Services/InductionClassService';
import { InductionClassRequest } from '@Services/api';

function InductionClassCreationPage(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (
    values: InductionClassRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    const createdInductionClass = await createInductionClass(values);
    const { quarter } = createdInductionClass;

    setSubmitting(false);
    history.push(ROUTES.INDUCTION_CLASS_DETAILS_WITH_QTR(quarter));
  };

  const handleCancel = () => {
    history.push(ROUTES.INDUCTION_CLASS_GENERAL);
  };

  return (
    <Card className={classes.root}>
      <InductionClassCreationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
}

export default InductionClassCreationPage;
