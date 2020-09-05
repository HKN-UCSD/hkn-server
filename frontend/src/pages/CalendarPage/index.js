import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Button } from '@material-ui/core';

import Calendar from './components/Calendar';
import EventCard from './components/EventCard';
import EventList from './components/EventList';
import styles from './styles';

import { getAllEvents } from '@Services/EventService';

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
    getAllEvents().then(multipleEventResponse => {
      const { events } = multipleEventResponse;
      const calendarEvents = [];

      events.forEach(event => {
        // make a copy of the event
        const newEvent = Object.assign(event);

        // For EventList
        newEvent.title = newEvent.name;

        calendarEvents.push(newEvent);
      });

      this.setState({ events: calendarEvents });
    });
  }

  toggleView() {
    this.setState(prevState => ({
      view: prevState.view === 'calendar' ? ' list' : 'calendar',
    }));
  }

  toggleEventClick(event) {
    const { selectedEvent } = this.state;
    if (selectedEvent != null && event.id === selectedEvent.id) {
      this.setState({
        selectedEvent: null,
      });
    } else {
      this.setState({ selectedEvent: event });
    }
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
                handleEventClick={event => this.toggleEventClick(event)}
              />
            ) : (
              <EventList
                events={events}
                handleEventClick={event => this.toggleEventClick(event)}
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
