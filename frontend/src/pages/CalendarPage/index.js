import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Button } from '@material-ui/core';

import Calendar from '../../components/Calendar';
import EventCard from '../../components/EventCard';
import EventList from '../../components/EventList';

import styles from './styles';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
      view: 'calendar',
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
        startDate: '2020-03-29T01:30:49+00:00',
        endDate: '2020-03-29T02:30:49+00:00',
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

  toggleView() {
    this.setState(prevState => ({
      view: prevState.view === 'calendar' ? ' list' : 'calendar',
    }));
  }

  render() {
    const { selectedEvent, events, view } = this.state;
    const { classes } = this.props;

    return (
      <Grid className={classes.root} container spacing={1}>
        <Grid container justify='flex-end'>
          <Button
            onClick={() => {
              this.toggleView();
            }}
          >
            {view === 'calendar' ? 'list View' : 'calendar view'}
          </Button>
        </Grid>

        <Grid item xs>
          <Paper>
            {view === 'calendar' ? (
              <Calendar
                events={events}
                handleEventClick={event =>
                  this.setState({ selectedEvent: event })
                }
              />
            ) : (
              <EventList
                events={events}
                handleEventClick={event =>
                  this.setState({ selectedEvent: event })
                }
              />
            )}
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
