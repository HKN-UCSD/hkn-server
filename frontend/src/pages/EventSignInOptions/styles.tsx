import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  buttonsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  button: {
    margin: '50px',
  },
  h2: {
    fontFamily: 'Roboto',
    color: '#000000',
  },
});

export default useStyles;
