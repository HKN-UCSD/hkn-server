// Disclaimer: This is horrible naming but I shall fix it later

import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../services/Firebase';

const styles = theme => ({
  root: {
    backgroundColor: grey[400],
  },
  gridItem: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});

class PointDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNames: [],
      officerSigns: [],
    };
  }

  componentDidMount() {
    const { user, firebase } = this.props;
    this.setState({ officerSigns: user.officerSigns });
    firebase.getUserEvent(user.uid).then(events => {
      const eventNames = events.map(event => event.event_name);
      this.setState({ eventNames });
    });
  }

  render() {
    const { eventNames, officerSigns } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        justify='center'
        alignItems='flex-start'
      >
        <Grid item className={classes.gridItem} md={4}>
          <Card>
            <CardHeader title='Events' />
            <CardContent>
              {eventNames.map(eventName => (
                <Typography>{eventName}</Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.gridItem} md={4}>
          <Card>
            <CardHeader title='Officer Signoffs' />
            <CardContent>
              {officerSigns.map(officerName => (
                <Typography>{officerName}</Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

PointDetail.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    officerSigns: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default compose(withStyles(styles), withFirebase)(PointDetail);
