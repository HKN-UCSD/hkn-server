import React from 'react';
import { Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function DeleteEditButtons(props)
{
  let { classes } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.delete}
        variant='contained'
        color='secondary'
      >
        <DeleteIcon /> Delete
      </Button>

      <Button
        className={classes.edit}
        variant='contained'
        color='primary'
      >
        <EditIcon /> Edit
      </Button>
    </div>
  );
}

export default withStyles(styles)(DeleteEditButtons);