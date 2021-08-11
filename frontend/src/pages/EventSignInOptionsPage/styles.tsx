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
    marginBottom: '30px',
  },
  h2: {
    fontFamily: 'Roboto',
    color: '#000000',
    marginBottom: '60px',
  },
});

export default useStyles;
