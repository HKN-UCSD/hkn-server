import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';

interface snackbarProps {
  open: boolean;
  message: string;
  severity: string;
  handleClose: () => void;
  autoHideDuration?: number | null;
}

const defaultHideDuration = 10000;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlerts = ({ open, message, severity, handleClose, autoHideDuration = defaultHideDuration }: snackbarProps) => {
  return (
    <Snackbar
      TransitionComponent={Fade}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlerts;