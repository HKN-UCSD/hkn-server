import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import QRCode from 'qrcode.react';
import { Typography, Box, Grid } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { format, parseISO } from 'date-fns';

import useStyles from './styles';

import { Card, GetLocation , Loading } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';

interface EventID {
  id: string;
}

function QrCodePage(): JSX.Element {
  const classes = useStyles();
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);
  const [eventInfo, setEventInfo] = useState<EventResponse | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(eventId);
      setEventInfo(eventResponse);
    };

    getEvent();
  }, [eventId]);

  return eventInfo == null ? (
    <Loading />
  ) : (
    <Grid className={classes.root} container direction='column'>
      <Grid item className={classes.cardItem}>
        <Grid container justify='center' alignItems='center'>
          <Card title={eventInfo.name}>
            <Grid container>
              <Typography variant='h6' color='textSecondary' gutterBottom>
                {format(parseISO(eventInfo.startDate), 'PP')} -{' '}
                {format(parseISO(eventInfo.startDate), 'p')} to{' '}
                {format(parseISO(eventInfo.endDate), 'p')}
              </Typography>
              <Box className={classes.locationContainer}>
                <RoomIcon color='disabled' />
                <GetLocation location={eventInfo.location || ''} />
              </Box>
              <Grid className={classes.qrCode} container justify='center'>
                <QRCode
                  value={`https://portal.hknucsd.com${ROUTES.EVENT_QRCODE_INTERMEDIATE_WITH_ID(
                    eventInfo.id
                  )}`}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default QrCodePage;
