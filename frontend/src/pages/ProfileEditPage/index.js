import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';

import FormLayout from '../../components/FormLayout';
import {
  getAccountSection,
  getPersonalInfoSection,
} from '../../components/formSections';
import { PROFILE_WITH_ID } from '../../constants/routes';
import schema from './schema';
import styles from './styles';

class ProfileEditPage extends React.Component {
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

    this.setState({
      profile: {
        firstName: 'Godwin',
        lastName: 'Pang',
        email: 'gypang@ucsd.edu',
        major: 'Computer Engineering - ECE',
        gradYear: 2021,
      },
    });
  }

  render() {
    const {
      classes,
      history,
      match: {
        params: { id },
      },
    } = this.props;
    const { profile } = this.state;

    if (profile === null) {
      return <></>;
    }

    const handleSave = (newProfile, setSubmitting) => {
      // call API to save new profile
      setSubmitting(false);
      history.push(PROFILE_WITH_ID(id));
    };

    const handleCancel = () => {
      // TODO maybe throw up a modal
      history.push(PROFILE_WITH_ID(id));
    };

    const sections = [getAccountSection(), getPersonalInfoSection()];
    return (
      <Formik
        initialValues={profile}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          handleSave(values, setSubmitting);
        }}
      >
        {({ submitForm }) => (
          <Form>
            <Grid container className={classes.root}>
              <Card className={classes.paper}>
                <CardContent>
                  <FormLayout
                    title='Profile'
                    sections={sections}
                    onSubmit={submitForm}
                    onCancel={handleCancel}
                    submitButtonText='Save'
                  />
                </CardContent>
              </Card>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  }
}

ProfileEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(ProfileEditPage);
