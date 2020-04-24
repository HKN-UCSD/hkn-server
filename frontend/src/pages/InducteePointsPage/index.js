import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Table from '../../components/Table';
import PointDetail from './PointDetail';

import { USER_ROLES } from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import { queryCurrentUserRole } from '../../services/user';
import { getInducteesInfo } from '../../services/officer';

const INITIAL_STATE = {
  users: [],
  isOfficer: null,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 9,
  },
});

const columns = [
  { title: 'Email', field: 'email' },
  { title: 'Total Points', field: 'inductionPoints' },
  {
    title: 'Mentorship Requirement',
    field: 'mentorshipStatus',
    lookup: { Complete: 'Complete', Incomplete: 'Incomplete' },
  },
  {
    title: 'Professional Requirement',
    field: 'professionalStatus',
    lookup: { Complete: 'Complete', Incomplete: 'Incomplete' },
  },
];

class InducteePoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    const users = [];
    queryCurrentUserRole()
      .then(userRole => {
        const isOfficer = userRole === USER_ROLES.OFFICER;
        this.setState({ isOfficer });
        return isOfficer;
      })
      .then(isOfficer => {
        if (isOfficer) {
          getInducteesInfo().then(inducteeInfo => {
            inducteeInfo.forEach(data => {
              const {
                induction_points: inductionPoints,
                professional,
                mentorship,
                email,
              } = data;

              let { officer_signs: officerSigns } = data;
              if (!officerSigns) {
                officerSigns = [];
              }

              const uid = data.id;
              const mentorshipStatus = mentorship ? 'Complete' : 'Incomplete';
              const professionalStatus = professional
                ? 'Complete'
                : 'Incomplete';

              users.push({
                uid,
                email,
                inductionPoints,
                mentorshipStatus,
                professionalStatus,
                officerSigns,
              });
            });
            this.setState({ users });
          });
        }
      });
  }

  render() {
    const { users, isOfficer } = this.state;
    const { classes } = this.props;
    if (isOfficer === false) {
      return <Redirect to={ROUTES.HOME} />;
    }
    if (isOfficer === true) {
      return (
        <div className={classes.root}>
          <Table
            columns={columns}
            data={users}
            title='Inductee Points'
            detailPanel={data => {
              return <PointDetail user={data} />;
            }}
            options={{ filtering: true }}
          />
        </div>
      );
    }
    return null;
  }
}

export default compose(withStyles(styles))(InducteePoints);
