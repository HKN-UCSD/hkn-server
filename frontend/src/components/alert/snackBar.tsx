import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';

interface snackbarProps {
  open: boolean;
  message: string;
  severity: string;
  handleClose: () => void;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlerts = (props: snackbarProps) => {
  const { open, message, severity, handleClose } = props;
  return (
    <Snackbar
      TransitionComponent={Fade}
      open={open}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlerts;