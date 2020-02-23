import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress as CircularProgress } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 3,
  },
});

const INITIAL_STATES = {
  completed: 0,
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATES,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    const { completed } = this.state;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          variant='determinate'
          value={completed}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
