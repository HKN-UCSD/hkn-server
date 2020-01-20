import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { USER_ROLES } from '../../constants/roles'
import { POINT_TYPE } from '../../constants/pointtype'

import PointDisplay from './point_display'

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
  },
})

class PointsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: "",
      mentorship: false,
      professional: false,
      inducteePoints: [],
      inducteeMentorPoints: [],
      memberPoints: [],
      memberMentorPoints: [],
      totalPoints: {
        induction: 0,
        member: 0,
      },
      pointRewardTypes: {},
      roles: {},
    };
  }

  addDetails = (list, data) => {
    list.push({
      event_name: data.event_name,
      date: new Date(data.created.seconds * 1000),
      value: data.value,
      officer: data.officer_name,
    })
  }

  componentDidMount() {
    this.props.firebase.getEnumMap('roles')
      .then((roleEnum) => { this.setState({ roles: roleEnum }) })
    this.props.firebase.getUserDocument()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          throw Error('User document does not exist.')
        }
        return docSnapshot.data()
      })
      .then(data => {
        this.setState({
          userRole: data.role_id,
          mentorship: data.mentorship,
          professional: data.professional
        })
      })

    this.props.firebase.getEnumMap('pointRewardType')
      .then((pointEnum) => { this.setState({ pointRewardTypes: pointEnum }) })
      .then(
        this.props.firebase.getPoints()
          .then(query => {
            if (!query) {
              throw Error('Point query failed')
            }
            const pointsList = {
              inducteePointsList: [],
              inducteeMentorList: [],
              memberPointsList: [],
              memberMentorList: [],
              totals: {
                induction: 0,
                member: 0,
              }
            }
            query.docs.forEach(doc => {
              const data = doc.data();
              if (data.pointrewardtype_id === this.state.pointRewardTypes[POINT_TYPE.INDUCTION]) {
                if (data.event_name.includes("Mentor")) {
                  this.addDetails(pointsList.inducteeMentorList, data)
                } else {
                  this.addDetails(pointsList.inducteePointsList, data)
                }
                pointsList.totals.induction += data.value
              } else {
                if (data.event_name.includes("Mentor")) {
                  this.addDetails(pointsList.memberMentorList, data)
                } else {
                  this.addDetails(pointsList.memberPointsList, data)
                }
                pointsList.totals.member += data.value
              }
            })
            return pointsList
          })
          .then(pointsList => {
            this.setState({
              inducteePoints: pointsList.inducteePointsList,
              inducteeMentorPoints: pointsList.inducteeMentorList,
              memberPoints: pointsList.memberPointsList,
              memberMentorPoints: pointsList.memberMentorList,
              totalPoints: pointsList.totals,
            })
          })
      )
  }


  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.contentWrapper}>
          {this.state.userRole === this.state.roles[USER_ROLES.MEMBER] || this.state.userRole === this.state.roles[USER_ROLES.OFFICER] ?
            <div>
              <h2>Member Points</h2>
              <Grid container spacing={24}>
                <Grid item><h3>Total Member Points: {this.state.totalPoints.member}</h3></Grid>
              </Grid>
              <PointDisplay points={this.state.memberPoints} />

              <h3>Mentor Points</h3>
              <PointDisplay points={this.state.memberMentorPoints} />

              <br />
              <Divider />
            </div> : null}


          <h2>Inductee Points</h2>
          <Grid container spacing={24}>
            <Grid item><h3>Total Inductee Points: {this.state.totalPoints.induction}</h3></Grid>
            <Grid item><h3>Mentor Point: {this.state.mentorship ? `Complete` : `Incomplete`}</h3></Grid>
            <Grid item><h3>Professional Requirement: {this.state.professional ? `Complete` : `Incomplete`}</h3></Grid>
          </Grid>
          <PointDisplay points={this.state.inducteePoints} />

          <h3>Mentor Points</h3>
          <PointDisplay points={this.state.inducteeMentorPoints} />

        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles), withFirebase)(PointsPage)