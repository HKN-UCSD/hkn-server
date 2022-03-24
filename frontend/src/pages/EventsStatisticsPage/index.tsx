import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Typography, Box, Grid } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { format, parseISO } from 'date-fns';

import { DataGrid } from '@material-ui/data-grid';

import useStyles from './styles';

import { Card, GetLocation, Loading } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';


const columns = [
  { field: 'eventType', headerName: 'Event Type', width: 180, sortable: false, },
  { field: 'totalAttendees', headerName: 'Total Attendees', width: 210, },
  { field: 'guests', headerName: 'Guests', width: 170, },
  { field: 'inductees', headerName: 'Inductees', width: 210, },
  { field: 'members', headerName: 'Members', width: 200, },
  { field: 'officers', headerName: 'Officers', width: 210, },
]

const rows = [
  { eventType: 'Social', totalAttendees: 23, guests: 3, inductees: 10, members: 7, officers: 3 },
];



function EventsStatisticsPage(): JSX.Element {
  const classes = useStyles();


  return (
    <Grid container direction='column'>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.eventType}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Grid>
  );
}

export default EventsStatisticsPage;
