import React from 'react';
import * as LOGO_URL from '@Images/hkn-logo-white.png';
import useStyles from './styles.ts';
import { Typography } from '@material-ui/core';

export const HomepageBanner = () => { 
  const classes = useStyles();

  return (
    <div
      className={classes.banner}
    >
      <img src={LOGO_URL} className={classes.logo} alt="HKN Logo"/>
      <div className={classes.container}>
        <h2 className={classes.h2}>
          University of California, San Diego
        </h2>
        <Typography className={classes.mainheader} variant='h2'>ETA KAPPA NU </Typography>
        <h2 className={classes.h2}>
          Engineering Honor Society of IEEE
        </h2>
      </div>
    </div>
  )
};

export default HomepageBanner