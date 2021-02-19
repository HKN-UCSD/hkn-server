import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { format, parseISO } from 'date-fns';

import useStyles from './styles';

import { Card } from '@SharedComponents';

export interface PointProps {
  attendances: unknown[];
}

export function PointDisplay(props: PointProps): JSX.Element {
  const classes = useStyles();

  const { attendances } = props;
  return (
    <>
      {attendances.length > 0 ? (
        <div>
          <Grid container spacing={2}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {attendances.map((attendance: any) => {
              const { event } = attendance;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={event.name}>
                  <Card className={classes.card}>
                    <>
                      <Typography variant='h5' component='h2'>
                        {event.name}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        {format(parseISO(attendance.startTime), 'PP')}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        {/* {`Officer: ${event.officer}`} */}
                        {/* <br /> */}
                        {`Points: ${attendance.points}`}
                      </Typography>
                    </>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div>You have no points yet!</div>
      )}
    </>
  );
}
