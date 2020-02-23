import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventButtonsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 9,
  },
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: '20px',
  },
  h2: {
    fontFamily: 'Roboto',
    color: '#3f51b5',
  },
});

const EventButtons = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.eventButtonsDiv}>
        <h2 className={classes.h2}>HKN STAFF PROGRAM</h2>
        <div className={classes.buttonRow}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            href='https://docs.google.com/forms/d/e/1FAIpQLSdRBwB-C7vY1803_Om3kiCJgzoMEam0-mmrGUdN1GIqFfKfYw/viewform'
            target='_blank'
            rel='noopener noreferrer'
          >
            Sign-Up Form
            </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            href='https://docs.google.com/forms/d/e/1FAIpQLSeqMbwiwA9Ip5wcwxwmalSc_z4S4No4MUZoVdTPltmGRxBP2A/viewform'
            target='_blank'
            rel='noopener noreferrer'
          >
            Log Points Form
            </Button>
        </div>
      </div>

      {/* <div className={this.props.classes.eventButtonsDiv}>
              <h2 className={this.props.classes.h2}>HKN VOLUNTEER PROGRAM</h2>
              
            </div> */}

      <div className={classes.eventButtonsDiv}>
        <h2 className={classes.h2}>HKN BUDDY PROGRAM</h2>
        <div className={classes.buttonRow}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            href='https://docs.google.com/forms/d/e/1FAIpQLScWsLIXMPY_jwpU3qXkWahOkYug8y03g3fthYJnz_94CmpRGQ/viewform'
            target='_blank'
            rel='noopener noreferrer'
          >
            Sign-Up Form
            </Button>
        </div>
      </div>
    </div>
  );

}

export default withStyles(styles)(EventButtons);
