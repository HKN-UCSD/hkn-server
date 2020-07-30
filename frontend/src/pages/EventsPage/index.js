import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Divider } from '@material-ui/core';
import { queryCurrentUserRole } from '@services/user';
import EventButtons from './eventButtons';


const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  contentWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(9),
    // display: 'flex',
    // [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
    //   flexDirection: 'row',
    // },
    // [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    //   flexDirection: 'column',
    // },
    // flexDirection:'row',
    alignItems: 'center',
    // height: "100vh",
  },
});

const INITIAL_STATE = {
  width: 500,
  height: 1000,
  buttons: null,
};

class EventsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.resizeFB = this.resizeFB.bind(this);
    this.checkIfInductee();
  }

  componentDidMount() {
    this.resizeFB();
    window.addEventListener('resize', this.resizeFB);
  }

  resizeFB = () => {
    let fbHeight = window.innerHeight;
    let fbWidth = window.innerWidth;

    // Range check for allowed height of FB Page plugin
    if (fbHeight < 70) {
      fbHeight = 70;
    }

    // Range check for allowed width of FB Page plugin
    if (fbWidth > 500) {
      fbWidth = 500;
    } else if (fbWidth < 180) {
      fbWidth = 180;
    }

    this.setState({
      height: fbHeight,
      width: fbWidth,
    });
  };

  getPagePluginURL = () => {
    const { width, height } = this.state;
    return `${'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhknucsd%2F&tabs=events' +
      '&width='}${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`;
  };

  getCalendarPluginURL = () => {
    return 'https://calendar.google.com/calendar/embed?src=v90k4miuerv8iemlu0c3gaq968%40group.calendar.google.com&ctz=America%2FLos_Angeles';
  };

  checkIfInductee() {
    queryCurrentUserRole()
      .then(role => {
        if (role !== undefined && role !== 'Inductee') {
          this.setState({
            buttons: <EventButtons />,
          });
        }
      })
      .catch(error => {
        throw Error(`ERROR: ${error}`);
      });
  }

  render() {
    const { buttons, width, height } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div style={{ margin: '20px' }}>{buttons}</div>

        <div className={classes.contentWrapper}>
          <Divider />
          <h1 style={{ textAlign: 'center' }}>Upcoming Events</h1>
          <Divider />
        </div>
        <div className={classes.root}>
          <iframe
            title='hkn-ucsd-fb'
            className={classes.contentWrapper}
            src={this.getPagePluginURL()}
            width={width}
            height={height}
            frameBorder='0'
            allow='encrypted-media'
            overflow-x='visible'
          />

          <iframe
            title='hkn-google-cal'
            className={classes.contentWrapper}
            src={this.getCalendarPluginURL()}
            width={width}
            height={height}
            frameBorder='0'
            allow='encrypted-media'
          />
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles))(EventsPage);
