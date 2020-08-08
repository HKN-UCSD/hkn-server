import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import PointDetail from './PointDetail';

import getInducteesInfo from '@Services/officer';
import { Table } from '@SharedComponents';

const INITIAL_STATE = {
  users: [],
};

const styles = () => ({
  root: {
    width: '100%',
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

    getInducteesInfo()
      .then(inducteeInfo => {
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
          const professionalStatus = professional ? 'Complete' : 'Incomplete';

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
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { users } = this.state;
    const { classes } = this.props;

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
}

export default compose(withStyles(styles))(InducteePoints);
