import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Card, CardContent, Grid } from '@material-ui/core';

import { FormLayout } from '@SharedComponents';
import {
  getAccountSection,
  getPersonalInfoSection,
} from '@SharedComponents/formSections';
import { PROFILE_EDIT_WITH_ID } from '@Constants/routes';
import styles from './styles';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    // const {
    //   match: {
    //     params: { id },
    //   },
    // } = this.props;
    // make db query here
    this.setState({
      profile: {
        firstName: 'Godwin',
        lastName: 'Pang',
        email: 'gypang@ucsd.edu',
        major: 'Computer Engineering',
        gradYear: 2021,
      },
    });
  }

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
    } = this.props;
    const { profile } = this.state;

    if (profile === null) {
      return <></>;
    }

    const { firstName, lastName, email, major, gradYear } = profile;
    const sections = [
      getAccountSection({ readOnly: true, email }),
      getPersonalInfoSection({
        readOnly: true,
        firstName,
        lastName,
        major,
        gradYear,
      }),
    ];

    return (
      <Grid container className={classes.root}>
        <Card className={classes.paper}>
          <CardContent>
            <FormLayout
              readOnly
              editEndpoint={PROFILE_EDIT_WITH_ID(id)}
              title='Profile'
              sections={sections}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProfilePage);

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
