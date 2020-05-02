import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container } from '@material-ui/core';

import moment from 'moment';

import Calendar from '../../components/Calendar';
import EventCard from '../../components/EventCard';

import styles from './styles';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
    };
  }

  componentDidMount() {
    const calendarEvents = [
      {
        id: 'qO8nJ50tCO57hptbxNZa',
        title: 'Enhanced multi-tasking model',
        description:
          'Pressure someone institution fund account part. Entire couple develop main.\nMeeting sea school me policy beautiful well. Agent ground so majority care born blood.',
        venue: 'Lindsey Rapids',
        startDate: '2020-05-02T01:30:49+00:00',
        endDate: '2020-05-02T02:30:49+00:00',

        eventName: 'Enhanced multi-tasking model',
        startTime: moment('2020-05-02T01:30:49+00:00').toDate(),
        endTime: moment('2020-05-02T02:30:49+00:00').toDate(),
        hosts: 'Lindsey Rapids',
      },
      {
        id: 'mRaXeYuSCMmqMOngDl7B',
        title: 'Customizable bottom-line help-desk',
        description:
          'Reason clear rest the lay. Customer fill change.\nCampaign member we notice include investment. Near they order particularly western life. Reflect bed offer dinner top Mr of her.',
        venue: 'Frazier Station',
        startDate: '2020-03-30T21:04:26+00:00',
        endDate: '2020-03-30T22:04:26+00:00',
      },
    ];
    this.setState({ events: calendarEvents });
  }

  render() {
    const { selectedEvent, events } = this.state;
    const { classes } = this.props;
    return (
      <Grid className={classes.root} container spacing={1}>
        <Grid item xs>
          <Paper>
            <Calendar
              events={events}
              handleEventClick={event =>
                this.setState({ selectedEvent: event })
              }
            />
          </Paper>
        </Grid>
        {selectedEvent && (
          <Grid item xs={4}>
            <Container>
              <EventCard event={selectedEvent} />
            </Container>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(CalendarPage);
