import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Container,
  Button as MuiButton,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import Calendar from './components/Calendar';
import EventCard from './components/EventCard';
import EventList from './components/EventList';
import styles from './styles';

import * as ROUTES from '@Constants/routes';
import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import { getAllEvents } from '@Services/EventService';
import { Button } from '@SharedComponents';

import SnackbarErrors from '../../components/error/snackBar'

class CalendarPage extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      selectedEvent: null,
      view: 'calendar',
      pending: true,
      ready: true,
      complete: true,
      openSnackbar: false,
      severity: "info",
      message: "Hello World"
    };
  }

  componentDidMount() {
    const { pending, ready, complete } = this.state;

    getAllEvents({ pending, ready, complete }).then(multipleEventResponse => {
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

  componentDidUpdate(prevProps, prevState) {
    const { pending, ready, complete } = this.state;

    if (
      pending !== prevState.pending ||
      ready !== prevState.ready ||
      complete !== prevState.complete
    ) {
      getAllEvents({ pending, ready, complete }).then(multipleEventResponse => {
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
  }

  handlePendingChange() {
    const { pending } = this.state;
    this.setState({ pending: !pending });
  }

  handleReadyChange() {
    const { ready } = this.state;
    this.setState({ ready: !ready });
  }

  handleCompleteChange() {
    const { complete } = this.state;
    this.setState({ complete: !complete });
  }

  handleModalClose() {
    this.setState({
      selectedEvent: null,
    });
  }

  toggleView() {
    this.setState(prevState => ({
      view: prevState.view === 'calendar' ? ' list' : 'calendar',
      message: "view changed",
      openSnackbar: true,
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

  closeSnackbar() {
    this.setState({ openSnackbar: false });
  }
  render() {
    const {
      selectedEvent,
      events,
      view,
      pending,
      ready,
      complete,
      openSnackbar,
      message,
      severity,
    } = this.state;
    const { classes, history } = this.props;
    return (
      <Grid className={classes.root} container direction='column'>
        <Grid className={classes.buttons} container justify='space-between'>
          <Grid item>
            {OfficerRenderPermission(Button)({
              secondary: true,
              positive: true,
              children: 'Create Event',
              onClick: () => {
                history.push(ROUTES.EVENT_CREATION);
              },
            })}
          </Grid>

          {view === 'calendar' && (
            <Grid item>
              {OfficerRenderPermission(FormControlLabel)({
                control: (
                  <Checkbox
                    name='pending'
                    onChange={() => this.handlePendingChange()}
                    checked={pending}
                  />
                ),
                label: 'Pending',
              })}
              <FormControlLabel
                control={
                  <Checkbox
                    name='ready'
                    onChange={() => this.handleReadyChange()}
                    checked={ready}
                  />
                }
                label='Ready'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='complete'
                    onChange={() => this.handleCompleteChange()}
                    checked={complete}
                  />
                }
                label='Complete'
              />
            </Grid>
          )}

          <Grid item>
            <MuiButton
              onClick={() => {
                this.toggleView();
              }}
            >
              {view === 'calendar' ? 'list View' : 'calendar view'}
            </MuiButton>
          </Grid>
        </Grid>

        <Grid item className={classes.calendar}>
          <Grid container>
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

            {(selectedEvent !== null) && (
              <Container>
                <EventCard
                  event={selectedEvent}
                  onClose={() => this.handleModalClose()}
                />
              </Container>
            )}
          </Grid>
          <SnackbarErrors
            open={openSnackbar}
            message={message}
            severity={severity}
            handleClose={event => this.closeSnackbar()} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CalendarPage);
