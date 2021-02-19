import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    backgroundColor: grey[200],
  },
  title: {
    backgroundColor: grey[400],
  },
  list_item_text: {
    fontSize: '16px',
  },
});

export default useStyles;
