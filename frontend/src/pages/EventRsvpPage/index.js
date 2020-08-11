import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import EventRsvpForm from './components/EventRsvpForm';
import styles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Loading } from '@SharedComponents';
import { getEventById } from '@Services/events';

class EventRsvpPage extends React.Component {
  constructor(props) {
    const {
      match: {
        params: { id },
      },
    } = props;

    super(props);

    this.state = {
      eventId: id,
      eventInfo: null,
    };
  }

  componentDidMount() {
    const { eventId } = this.state;

    getEventById(eventId)
      .then(eventObj => {
        this.setState({ eventInfo: eventObj });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = (values, setSubmitting) => {
    console.log(values);

    setSubmitting(false);
  };

  render() {
    const { classes } = this.props;
    const { eventInfo } = this.state;

    const EventRsvp =
      eventInfo == null ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Card className={classes.eventRsvpCard}>
            <Grid container direction='column' alignItems='center' spacing={3}>
              <Grid item>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  spacing={3}
                >
                  <Grid item>
                    <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
                  </Grid>

                  <Grid item>
                    <Typography
                      className={classes.eventName}
                      variant='h5'
                      align='center'
                    >
                      {eventInfo.name}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant='h6'>Event RSVP</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <EventRsvpForm handleSubmit={this.handleSubmit} />
              </Grid>
            </Grid>
          </Card>
        </div>
      );

    return EventRsvp;
  }
}

EventRsvpPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default withStyles(styles)(EventRsvpPage);
