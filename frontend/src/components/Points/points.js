import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'

import { USER_ROLES } from '../../constants/roles'
import { POINT_TYPE } from '../../constants/pointtype'

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

    this.state = {
      userRole: "",
      inducteePoints: [],
      memberPoints: [],
    };
  }

  componentDidMount() {
    this.props.firebase.getUserDocument()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          throw Error('User document does not exist.')
        }
        return docSnapshot.data()
      })
      .then(data => { this.setState({ userRole: data.role_id }) })

    this.props.firebase.getPoints()
      .then(query => {
        const pointsList = {
          inducteePointsList: [],
          memberPointsList: [],
        }
        query.docs.forEach(doc => {
          const data = doc.data();
          if (data.pointrewardtype_id === POINT_TYPE.INDUCTION) {
            pointsList.inducteePointsList.push({
              event_name: data.event_name,
              date: new Date(data.created.seconds * 1000),
              value: data.value,
              officer: data.officer_name,
            })
          } else {
            pointsList.memberPointsList.push({
              event_name: data.event_name,
              date: new Date(data.created.seconds * 1000),
              value: data.value,
              officer: data.officer_name,
            })
          }
        })
        return pointsList
      })
      .then(pointsList => {
        this.setState({
          inducteePoints: pointsList.inducteePointsList,
          memberPoints: pointsList.memberPointsList,
        })
      })
  }


  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.contentWrapper}>
          <h2>(Inductee) Events | Date | Officer | Points</h2>
          {this.state.inducteePoints.map((event, key) => {
            return <li key={key}>{event.event_name} | {`${months_arr[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`} | {event.officer} | {event.value}</li>
          })}

          {this.state.userRole === USER_ROLES.MEMBER || this.state.userRole === USER_ROLES.OFFICER ?
            <div>
              <h2>(Member) Events | Date | Officer | Points</h2>
              {this.state.memberPoints.map((event, key) => {
                return <li key={key}>{event.event_name} | {`${months_arr[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`} | {event.officer} | {event.value}</li>
              })}
            </div> : null}
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles), withFirebase)(PointsPage)