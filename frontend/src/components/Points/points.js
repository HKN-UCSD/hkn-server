import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

const styles = theme => ({
  root: {
    width: "100%",
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  contentWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 9,

    alignItems: 'center',
    height: "100vh",
  }
})

const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

class PointsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inducteePoints: [] };
  }

  componentDidMount() {
    this.props.firebase.getInducteePoints()
      .then(query => {
        let pointsList = []
        query.docs.forEach(doc => {
          pointsList.push({
            event_name: doc.data().event_name,
            date: new Date(doc.data().created.seconds * 1000),
            value: doc.data().value,
          })
        })
        return pointsList
      })
      .then(pointsList => this.setState({ inducteePoints: pointsList }))
  }


  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.contentWrapper}>
          <h2>Events | Date | Points</h2>
          {this.state.inducteePoints.map((event, key) => {
            return <li key={key}>{event.event_name} | {`${months_arr[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`} | {event.value}</li>
          })}
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles), withFirebase)(PointsPage)