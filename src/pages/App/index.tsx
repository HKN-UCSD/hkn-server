import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { hot } from 'react-hot-loader/root';

import {
  SignInPage,
  SignUpPage,
  PointsPage,
  InducteePointsPage,
  ResumePage,
  EventsPage,
  CalendarPage,
  EventEditPage,
  EventDetailsPage,
  EventSignInPage,
  EventRsvpPage,
  QueriedEventPage,
  InterviewSchedulingPage,
} from '@Pages';
import { Loading } from '@SharedComponents';
import { UserContext, UserContextValues } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { getUserRole } from '@Services/UserService';
import {
  InducteeRoutingPermission,
  OfficerRoutingPermission,
} from '@HOCs/RoutingPermissions';
import ApiConfigStore from '@Services/ApiConfigStore';
import { config } from '@Config';

function App(): JSX.Element {
  const [userClaims, setUserClaims] = useState<UserContextValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const { claims, token } = tokenResult;

        // TODO if there's no change then don't set state to
        // save a rerender
        ApiConfigStore.setToken(token || '');

        const id = parseInt(claims.user_id, 10);
        const userRole = await getUserRole(id);

        setUserClaims({
          userId: claims.user_id,
          userRoles: [userRole.role],
        });
        setIsLoading(false);
      } else {
        setUserClaims(null);
        setIsLoading(false);
      }
    });
  }, []);

  // eslint-disable-next-line camelcase
  const setClaims = async (
    // eslint-disable-next-line camelcase
    userID: string,
    token: string
  ): Promise<void> => {
    ApiConfigStore.setToken(token);

    const id = parseInt(userID, 10);
    const userRole = await getUserRole(id);

    setUserClaims({
      userId: userID,
      userRoles: [userRole.role],
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={userClaims}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={ROUTES.SIGN_IN}
            render={() => <SignInPage setClaims={setClaims} />}
          />
          <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
          <Route
            exact
            path={ROUTES.EVENT_SIGN_IN}
            render={() => <EventSignInPage />}
          />
          <Route
            exact
            path={ROUTES.EVENT_RSVP}
            render={() => <EventRsvpPage />}
          />
          <Route
            exact
            path={ROUTES.HOME}
            render={props => InducteeRoutingPermission(EventsPage)(props)}
          />
          <Route
            exact
            path={ROUTES.POINTS}
            render={props => InducteeRoutingPermission(PointsPage)(props)}
          />
          <Route
            exact
            path={ROUTES.RESUME}
            render={props => InducteeRoutingPermission(ResumePage)(props)}
          />
          <Route
            exact
            path={ROUTES.INDUCTEES}
            render={props =>
              OfficerRoutingPermission(InducteePointsPage)(props)
            }
          />
          <Route
            exact
            path={ROUTES.CALENDAR}
            render={props => InducteeRoutingPermission(CalendarPage)(props)}
          />
          <Route
            exact
            path={ROUTES.INTERVIEW_SCHEDULING}
            render={props =>
              InducteeRoutingPermission(InterviewSchedulingPage)(props)
            }
          />
          <Route
            exact
            path={ROUTES.EVENTS}
            render={() => <QueriedEventPage />}
          />
          <Route
            exact
            path={ROUTES.EVENT_DETAILS}
            render={props => InducteeRoutingPermission(EventDetailsPage)(props)}
          />
          <Route
            exact
            path={ROUTES.EVENT_EDIT}
            render={props => OfficerRoutingPermission(EventEditPage)(props)}
          />
          {/* <Route
              exact
              path={ROUTES.PROFILE}
              render={props => InducteeRoutingPermission(ProfilePage)(props)}
            />
            <Route
              exact
              path={ROUTES.PROFILE_EDIT}
              render={props => InducteeRoutingPermission(ProfileEditPage)(props)}
            /> */}
          <Route render={() => <Redirect to={ROUTES.HOME} />} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default config.nodeEnv === 'development' ? hot(App) : App;
