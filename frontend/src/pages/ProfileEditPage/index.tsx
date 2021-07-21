import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';

import schema from './schema';
import useStyles from './styles';

import { Card, FormLayout } from '@SharedComponents';
import {
  getAccountSection,
  getPersonalInfoSection,
} from '@SharedComponents/formSections';
import { PROFILE_WITH_ID } from '@Constants/routes';
import {
  AppUserResponse,
  AppUserResponseRoleEnum,
  AppUserPostRequest,
} from '@Services/api/models';

function ProfileEditPage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | null>(null);
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  setProfile({
    id: 1,
    firstName: 'Godwin',
    lastName: 'Pang',
    email: 'gypang@ucsd.edu',
    major: 'Computer Engineering - ECE',
    graduationYear: '2021',
    role: AppUserResponseRoleEnum.Officer,
  });

  if (profile === null) {
    return <></>;
  }

  const handleSave = (
    newProfile: AppUserPostRequest,
    setSubmitting: (_: boolean) => void
  ) => {
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
        // TODO fix this
        handleSave((values as unknown) as AppUserPostRequest, setSubmitting);
      }}
    >
      {({ submitForm }) => (
        <Form>
          <Grid container className={classes.root}>
            <Card className={classes.paper}>
              <FormLayout
                title='Profile'
                sections={sections}
                onSubmit={submitForm}
                onCancel={handleCancel}
                submitButtonText='Save'
              />
            </Card>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileEditPage;
