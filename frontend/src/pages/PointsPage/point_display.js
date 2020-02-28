import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import moment from 'moment';

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
                      <CardContent>
                        <Typography variant='h5' component='h2'>
                          {event.event_name}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color='textSecondary'
                        >
                          {moment(event.date).format('LL')}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          {`Officer: ${event.officer}`}
                          <br />
                          {`Points: ${event.value}`}
                        </Typography>
                      </CardContent>
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
  points: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default compose(withStyles(styles))(PointDisplay);
