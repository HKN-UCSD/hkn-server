import React, { useState } from 'react';
import SnackbarAlerts from '../alert/snackBar';
import { DEFAULT_403_MSG, DEFAULT_404_MSG, DEFAULT_500_MSG } from '@Constants/requestErrMsg';

interface CustomErrorMessages {
  [status: number]: string;
}

interface RequestErrorSnackbarProps {
  isError: boolean;
  error: Response;
  customErrorMessages?: CustomErrorMessages;
}

const RequestErrorSnackbar = ({ isError, error, customErrorMessages = {} }: RequestErrorSnackbarProps) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(isError);
  const { status, statusText } = error;
  const errorStatus = `${status} ${statusText}`;

  const handleErrorMessasge = () => {
    let errorMessage = '';

    if (status in customErrorMessages) {
      errorMessage = customErrorMessages[status];
    } else {
      if (status === 403) {
        errorMessage = DEFAULT_403_MSG;
      } else if (status === 404) {
        errorMessage = DEFAULT_404_MSG;
      } else if (status === 500) {
        errorMessage = DEFAULT_500_MSG;
      }
    }

    return errorMessage;
  }

  const messageToDisplay = `[${errorStatus}]${handleErrorMessasge()}`;

  return (
    <SnackbarAlerts
      open={isSnackbarOpen}
      handleClose={() => setSnackbarOpen(false)}
      message={messageToDisplay}
      severity='error'
    />
  );
}

export default RequestErrorSnackbar;