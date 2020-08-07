import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Grid, Divider } from '@material-ui/core';

import PointDisplay from './point_display';

import { POINT_TYPE } from '@Constants/pointtype';
import { getCurrentUserDocument } from '@Services/user';
import getEnumMap from '@Services/general';
import { getPoints } from '@Services/events';
import { UserContext } from '@Contexts';
import { isMember } from '@Services/claims';

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

    alignItems: 'center',
    height: '100vh',
  },
});

const INITIAL_STATES = {
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
};

class PointsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    getCurrentUserDocument()
      .then(data => {
        this.setState({
          mentorship: data.mentorship,
          professional: data.professional,
        });
      })
      .catch(err => console.log(err));

    getEnumMap('pointRewardType')
      .then(pointEnum => {
        if (
          pointEnum &&
          pointEnum.name &&
          pointEnum.message &&
          pointEnum.stack
        ) {
          console.log(pointEnum);
          throw Error('Point types unavailable');
        }
        this.setState({ pointRewardTypes: pointEnum });
      })
      .then(() => {
        const { pointRewardTypes } = this.state;
        getPoints()
          .then(pointDetails => {
            const pointsList = {
              inducteePointsList: [],
              inducteeMentorList: [],
              memberPointsList: [],
              memberMentorList: [],
              totals: {
                induction: 0,
                member: 0,
              },
            };
            pointDetails.forEach(data => {
              if (
                data.pointrewardtype_id ===
                pointRewardTypes[POINT_TYPE.INDUCTION]
              ) {
                if (data.event_name.includes('Mentor')) {
                  this.addDetails(pointsList.inducteeMentorList, data);
                } else {
                  this.addDetails(pointsList.inducteePointsList, data);
                }
                pointsList.totals.induction += data.value;
              } else {
                if (data.event_name.includes('Mentor')) {
                  this.addDetails(pointsList.memberMentorList, data);
                } else {
                  this.addDetails(pointsList.memberPointsList, data);
                }
                pointsList.totals.member += data.value;
              }
            });
            return pointsList;
          })
          .then(pointsList => {
            this.setState({
              inducteePoints: pointsList.inducteePointsList,
              inducteeMentorPoints: pointsList.inducteeMentorList,
              memberPoints: pointsList.memberPointsList,
              memberMentorPoints: pointsList.memberMentorList,
              totalPoints: pointsList.totals,
            });
          })
          .catch(err => {
            throw Error(`Update points list state error: ${err}`);
          });
      })
      .catch(err => {
        throw Error(`Points List error: ${err}`);
      });
  }

  addDetails = (list, data) => {
    list.push({
      event_name: data.event_name,
      date: new Date(data.created.seconds * 1000),
      value: data.value,
      officer: data.officer_name,
    });
  };

  render() {
    const userContext = this.context;
    const { classes } = this.props;
    const {
      totalPoints,
      memberPoints,
      memberMentorPoints,
      mentorship,
      professional,
      inducteePoints,
      inducteeMentorPoints,
    } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          {isMember(userContext) ? (
            <div>
              <div style={{ margin: '20px' }}>
                <h2>Member Points</h2>
                <Grid container justify='space-between'>
                  <Grid item>
                    <h3>Total Member Points: {totalPoints.member}</h3>
                  </Grid>
                </Grid>
                <PointDisplay points={memberPoints} />

                <h3>Mentor Points</h3>
                <PointDisplay points={memberMentorPoints} />

                <br />
              </div>
              <Divider />
            </div>
          ) : null}

          <div style={{ margin: '20px' }}>
            <h2>Inductee Points</h2>
            <Grid container justify='space-between' spacing={3}>
              <Grid item>
                <h3>Total Inductee Points: {totalPoints.induction}</h3>
              </Grid>
              <Grid item>
                <h3>Mentor Point: {mentorship ? `Complete` : `Incomplete`}</h3>
              </Grid>
              <Grid item>
                <h3>
                  Professional Requirement:{' '}
                  {professional ? `Complete` : `Incomplete`}
                </h3>
              </Grid>
            </Grid>
            <PointDisplay points={inducteePoints} />

            <h3>Mentor Points</h3>
            <PointDisplay points={inducteeMentorPoints} />
          </div>
        </div>
      </div>
    );
  }
}

PointsPage.contextType = UserContext;

export default compose(withStyles(styles))(PointsPage);
