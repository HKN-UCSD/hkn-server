import React from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonWithConfirmationModal } from '@SharedComponents';
import { deleteInductionClass } from '@Services/InductionClassService';
import * as ROUTES from '@Constants/routes';

interface InductionClassDeleteButtonProps {
  quarter: string;
}

const InductionClassDeleteButton = ({
  quarter,
}: InductionClassDeleteButtonProps) => {
  const history = useHistory();

  const confirmButtonProps = {
    name: 'Yes',
    onClick: async () => {
      await deleteInductionClass(quarter);
      history.push(ROUTES.INDUCTION_CLASS_GENERAL);
    },
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    onClick: () => history.push(ROUTES.INDUCTION_CLASS_GENERAL),
    positive: true,
  };

  return (
    <ButtonWithConfirmationModal
      confirmationModalProps={{
        title: 'Delete this induction class?',
        contentText:
          'This induction class will be deleted permanently from our database, and all users with this induction class will be stripped of it.',
        confirmButtonProps,
        cancelButtonProps,
      }}
      name='Delete'
      secondary
      negative
    />
  );
};

export default InductionClassDeleteButton;
