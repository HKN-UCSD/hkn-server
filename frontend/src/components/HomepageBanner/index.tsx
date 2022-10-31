import React from 'react';
import LOGO_URL from '@Images/hkn-logo-white.png';
import { Typography } from '@material-ui/core';
import {
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    background: '#5197FF',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  container: {
    width: 'auto',
  },
  h2: { 
    textAlign: 'left',
    padding: 1,
    margin: 0,
    fontWeight: 200,
    fontSize: '1.5vw',
  },
  mainheader: {
    fontWeight: 700,
    fontSize: 'max(3vw, 5vw)',
  },
  logo: {
    marginRight: 20,
    width: '20vw',
    height: 'auto',
  },
}));

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