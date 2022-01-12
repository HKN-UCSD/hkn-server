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
import { Loading, RequestErrorSnackbar, Table } from '@SharedComponents';
import styles from './styles';

import * as ROUTES from '@Constants/routes';
import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import { getAllEvents } from '@Services/EventService';
import { Button } from '@SharedComponents';
import { updateEvent } from '@Services/EventService';

class CalendarPage extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      hasEventStatusChanged: true,
      selectedEvent: null,
      view: 'calendar',
      pending: true,
      ready: true,
      complete: true,
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
    const { pending, ready, complete, hasEventStatusChanged } = this.state;

    if (
      pending !== prevState.pending ||
      ready !== prevState.ready ||
      complete !== prevState.complete ||
      hasEventStatusChanged !== prevState.hasEventStatusChanged
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

  handleUpdateStatus = async newStatus => {
    const { hasEventStatusChanged, selectedEvent } = this.state;
    const eventRequest = {
      ...selectedEvent,
      status: newStatus,
      hosts: selectedEvent.hosts.map(host => {
        return {
          id: host.id,
        };
      }),
    };
    const updatedEvent = await updateEvent(selectedEvent.id, eventRequest);
    this.setState({
      hasEventStatusChanged: !hasEventStatusChanged,
      selectedEvent: updatedEvent,
    });
  };

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
    const {
      selectedEvent,
      events,
      view,
      pending,
      ready,
      complete,
    } = this.state;
    const { classes, history } = this.props;
    const columns = [
      { title: 'Quarter', field: 'quarter' },
      { title: 'Name', field: 'name' },
      { title: 'Start Date', field: 'startDate' },
      { title: 'End Date', field: 'endDate' },
      {
        title: '',
      },
    ];
    return (
      <Grid className={classes.root} container direction='column'>
        <Grid className={classes.buttons} container justify='space-between'>
          <Grid item>
            {OfficerRenderPermission(Button)({
              secondary: true,
              positive: true,
              children: 'Save Changes',
              onClick: () => {
                // DO SOMETHING
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

        <Table
          columns={columns}
          data={null}
          title='Testing Title'
          options={{ exportButton: true }}
          pageSize={5}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(CalendarPage);
