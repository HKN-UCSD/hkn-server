import React from 'react';
import { Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function DeleteEditButtons(props)
{
  let { classes } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.delete}
        variant='outlined'
        color='primary'
      >
        Delete
      </Button>

      <Button
        className={classes.edit}
        variant='outlined'
        color='primary'
      >
        Edit
      </Button>
    </div>
  );
}

export default withStyles(styles)(DeleteEditButtons);