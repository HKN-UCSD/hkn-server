import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      display: 'flex', 
      flexWrap: 'wrap', 
      flexDirection: 'row',
      alignItems: 'center'
    },
    eventButtonsDiv: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto', 
      alignItems: 'center',
      marginTop: theme.spacing.unit * 9
    },
    h2: {
      fontFamily: 'Roboto',
      color: '#3f51b5'
    }
  })

class EventButtons extends React.Component {
    render() {
        return (
          <div className={this.props.classes.root}>
            <div className={this.props.classes.eventButtonsDiv}>
              <h2 className={this.props.classes.h2}>HKN STAFF PROGRAM</h2>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdRBwB-C7vY1803_Om3kiCJgzoMEam0-mmrGUdN1GIqFfKfYw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign-Up Form
              </Button>
            </div>
             
            <div className={this.props.classes.eventButtonsDiv}>
              <h2 className={this.props.classes.h2}>HKN MENTORSHIP PROGRAM</h2>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="https://docs.google.com/forms/d/e/1FAIpQLScLteJQRgfgxRoskQ17I1KElXoxatp_AZZg-kkgqAgc2HnBaA/closedform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign-Up Form
              </Button>
            </div>
          </div>
        )
    }
}

export default withStyles(styles)(EventButtons)