import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  eventDetailsCard: {
    width: '536px',
  },
  title: {
    wordWrap: 'break-word',
  },
  hosts: {
    wordWrap: 'break-word',
  },
  hostName: {
    marginBottom: '5px',
  },
  location: {
    wordWrap: 'break-word',
    maxWidth: 240,
  },
});

export default useStyles;
