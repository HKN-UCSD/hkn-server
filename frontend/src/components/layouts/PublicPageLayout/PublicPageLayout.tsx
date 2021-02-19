import React from 'react';
import { Grid, WithStyles, withStyles } from '@material-ui/core';

import styles from './styles';

export interface PublicPageLayoutProps extends WithStyles<typeof styles> {
  children: JSX.Element;
}

function PublicPageLayout(props: PublicPageLayoutProps): JSX.Element {
  const { children, classes } = props;
  return (
    <Grid
      className={classes.root}
      container
      direction='row'
      justify='center'
      alignItems='center'
    >
      <Grid item className={classes.children}>
        {children}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PublicPageLayout);
