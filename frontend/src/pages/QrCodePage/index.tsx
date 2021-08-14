import React from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Grid } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import useStyles from './styles';

import { Card, GetLocation } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

interface LocationState {
  event: {
    name: string;
    startDate: string;
    endDate: string;
    location: string;
    id: number;
  };
}

function QrCodePage(): JSX.Element {
  const classes = useStyles();
  const location = useLocation<LocationState>();
  const { event } = location.state;

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid item className={classes.cardItem}>
        <Grid container justify='center' alignItems='center'>
          <Card title={event.name}>
            <Grid container>
              <Typography variant='h6' color='textSecondary' gutterBottom>
                {format(parseISO(event.startDate), 'PP')} -{' '}
                {format(parseISO(event.startDate), 'p')} to{' '}
                {format(parseISO(event.endDate), 'p')}
              </Typography>
              <Box className={classes.locationContainer}>
                <RoomIcon color='disabled' />
                <GetLocation location={event.location} />
              </Box>
              <Grid className={classes.qrCode} container justify='center'>
                <QRCode
                  value={
                    `https://portal.hknucsd.com${ 
                    ROUTES.EVENT_QRCODE_INTERMEDIATE_WITH_ID(event.id)}`
                  }
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

QrCodePage.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
};

QrCodePage.defaultProps = {
  event: {
    location: '',
  },
};

export default QrCodePage;
