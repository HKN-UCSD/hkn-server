import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Divider } from '@material-ui/core';

import EventButtons from './eventButtons';

import { MemberRenderPermission } from '@HOCs/RenderPermissions';

import { getAllEvents } from '../../services/EventService';
import { EventCard } from '../../components/EventCard';
import { Button } from '@material-ui/core';

import { isAfter } from 'date-fns';

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
    // height: '100vh',
  },
});

const INITIAL_STATE = {
  width: 500,
  height: 1000,
};

class EventsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.resizeFB = this.resizeFB.bind(this);

    this.state = {
      events: false,
      show: 6,
    }
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState({ ...this.state, show: this.state.show + 6 });
    console.log(this.state.show);
  }

  componentDidMount() {
    this.resizeFB();
    window.addEventListener('resize', this.resizeFB);
    getAllEvents({pending: false, ready: true, complete: false}).then(res => {
      const curr = new Date();
      this.setState({
        events: res.events.sort((a, b) => { return isAfter(new Date(a.startDate), new Date(b.startDate)) ? 1 : -1; })
          .filter(event => (new Date(event.endDate) - curr) > 0),
        show: 6,
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFB);
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

  render() {
    //const { width, height } = this.state;
    const { classes } = this.props;

    const gridStyle = {
      display: 'grid',
      gridAutoFlow: 'row',
      gridTemplateColumns: 'repeat(3, 1fr)',
      rowGap: '24px',
      columnGap: '48px',
      flex: '1 0 100%',
      margin: '1em 0px',
    }

    return (
      <div>
        <div style={{ margin: '20px' }}>
          {MemberRenderPermission(EventButtons)({})}
        </div>

        <div className={classes.contentWrapper}>
          <Divider />
          <h1 style={{ textAlign: 'center' }}>Upcoming Events</h1>
          <Divider />
        </div>
        {this.state.events === false ? '' :
          this.state.events.length === 0 ? <h2 style={{ textAlign: 'center' }}>No Upcoming Events</h2> :
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className={classes.root} style={gridStyle}>
              {this.state.events.slice(0, this.state.show).map(event => EventCard({ event }))}
            </div>
            {
              this.state.events.length > this.state.show ?
              <Button className={classes.button} style={{ margin: '2em 0px 0px 0px' }} onClick={this.loadMore} variant='contained' color='primary' size='medium'>
                Load More
              </Button> : ""
            }
            </div>
        }
      </div>
    );
  }
}
export default compose(withStyles(styles))(EventsPage);
