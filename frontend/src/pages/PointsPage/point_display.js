import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { format } from 'date-fns';

import { Card } from '@SharedComponents';

const styles = () => ({
  card: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class PointDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
    };
  }

  componentDidUpdate(prevProps) {
    this.updatePoints(prevProps);
  }

  updatePoints(prevProps) {
    const { points } = this.props;
    if (prevProps.points !== points) {
      this.setState({
        points,
      });
    }
  }
  // componentWillReceiveProps(newProps) { this.setState(newProps); }

  render() {
    const { points } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {points.length > 0 ? (
          <div>
            <Grid container spacing={2}>
              {points.map(event => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={event.event_name}
                  >
                    <Card className={classes.card}>
                      <Typography variant='h5' component='h2'>
                        {event.event_name}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        {format(event.date, 'PP')}
                      </Typography>
                      <Typography variant='body2' component='p'>
                        {`Officer: ${event.officer}`}
                        <br />
                        {`Points: ${event.value}`}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : (
          <div>None</div>
        )}
      </div>
    );
  }
}

PointDisplay.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(PointDisplay);
