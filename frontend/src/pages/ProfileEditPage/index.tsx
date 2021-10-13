import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Card } from '@material-ui/core';

import useStyles from './styles';
import {
  InitialValuesType,
  ProfileEditForm,
} from './components/ProfileEditForm';

import { UserContext } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { getUserById, updateUserById } from '@Services/UserService';
import { AppUserResponse, AppUserPostRequest } from '@Services/api';
import { isUnauthorized } from '@Services/claims';

interface UserId {
  id: string;
}

const handleUndefinedStringValue = (value: string | undefined): string => {
  return value === undefined ? '' : value;
};

function ProfileEditPage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | undefined>(
    undefined
  );
  const history = useHistory();
  const classes = useStyles();

  const userContext = useContext(UserContext);
  const { id } = useParams<UserId>();

  useEffect(() => {
    const getUserProfileAndInductionRequirements = async () => {
      if (userContext == null || isUnauthorized(userContext, id)) {
        setProfile(undefined);
        return;
      }

      const { userId } = userContext;
      const currUserId: number =
        id === ROUTES.CURR_USER_ID_ALIAS
          ? parseInt(userId, 10)
          : parseInt(id, 10);

      try {
        const requestedProfile = await getUserById(currUserId);
        setProfile(requestedProfile);
      } catch {
        setProfile(undefined);
      }
    };

    getUserProfileAndInductionRequirements();
  }, [id, userContext]);

  if (profile === undefined) {
    return <></>;
  }

  const handleSubmit = async (
    values: AppUserPostRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    await updateUserById(profile.id, values);
    setSubmitting(false);
    history.push(ROUTES.PROFILE_WITH_ID(ROUTES.CURR_USER_ID_ALIAS));
  };

  const handleCancel = () => {
    history.push(ROUTES.PROFILE_WITH_ID(ROUTES.CURR_USER_ID_ALIAS));
  };

  const { email, preferredName, pronoun, customPronoun, infoSession } = profile;
  const initialValues: InitialValuesType = {
    ...profile,
    preferredName: handleUndefinedStringValue(preferredName),
    pronoun: handleUndefinedStringValue(pronoun),
    customPronoun: handleUndefinedStringValue(customPronoun),
    infoSession: handleUndefinedStringValue(infoSession),
  };

  return (
    <Card className={classes.root}>
      <ProfileEditForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        initialProfileValues={initialValues}
        uneditableValues={{
          email,
        }}
      />
    </Card>
  );
}

export default ProfileEditPage;

/* function ProfileEditPage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | null>(null);
  const { id } = useParams<UserId>();
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
*/
