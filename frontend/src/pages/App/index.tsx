/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ApiConfigStore, { emptyGetTokenFunc } from '@Services/ApiConfigStore';
import { config } from '@Config';

function App(): JSX.Element {
  const [userClaims, setUserClaims] = useState<UserContextValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const { claims, token } = tokenResult;

        const getTokenFunc = token
          ? async () => {
              return user.getIdToken();
            }
          : emptyGetTokenFunc;

        // TODO if there's no change then don't set state to
        // save a rerender
        ApiConfigStore.setGetTokenFunc(getTokenFunc);

        const id = parseInt(claims.user_id, 10);
        const userRole = await getUserRole(id);

        setUserClaims({
          userId: claims.user_id,
          userRoles: [userRole.role],
        });
        setIsLoading(false);
      } else {
        ApiConfigStore.setGetTokenFunc(emptyGetTokenFunc);
        setUserClaims(null);
        setIsLoading(false);
      }
    });
  }, []);

  // eslint-disable-next-line camelcase
  // only called on login
  const setClaims = async (
    // eslint-disable-next-line camelcase
    userID: string
  ): Promise<void> => {
    // I'm too tired - just rewrite the whole login/logout flow this is a mess
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    ApiConfigStore.setGetTokenFunc(() => {
      return user.getIdToken();
    });

    const id = parseInt(userID, 10);
    const userRole = await getUserRole(id);

    setUserClaims({
      userId: userID,
      userRoles: [userRole.role],
    });
  };

  // Add new pages here :)
  const pages: Map<string, (props?: any) => JSX.Element> = new Map([
    [ROUTES.SIGN_IN, () => <SignInPage setClaims={setClaims} />],
    [ROUTES.SIGN_UP, () => <SignUpPage />],
    [ROUTES.EVENT_SIGN_IN, () => <EventSignInPage />],
    [ROUTES.EVENT_RSVP, () => <EventRsvpPage />],

    [ROUTES.HOME, (props: any) => InducteeRoutingPermission(EventsPage)(props)],
    [
      ROUTES.POINTS,
      (props: any) => InducteeRoutingPermission(PointsPage)(props),
    ],
    [
      ROUTES.INDUCTEES,
      props => OfficerRoutingPermission(InducteePointsPage)(props),
    ],
    [ROUTES.CALENDAR, props => InducteeRoutingPermission(CalendarPage)(props)],
    [
      ROUTES.INTERVIEW_SCHEDULING,
      props => InducteeRoutingPermission(InterviewSchedulingPage)(props),
    ],
    [ROUTES.EVENTS, () => <QueriedEventPage />],
    [
      ROUTES.EVENT_DETAILS,
      props => InducteeRoutingPermission(EventDetailsPage)(props),
    ],
    [
      ROUTES.EVENT_EDIT,
      props => InducteeRoutingPermission(EventEditPage)(props),
    ],
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={userClaims}>
      <BrowserRouter>
        <Switch>
          {Array.from(pages).map(([path, renderFunc]) => (
            <Route exact path={path} render={renderFunc} />
          ))}
          <Route render={() => <Redirect to={ROUTES.HOME} />} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default config.nodeEnv === 'development' ? hot(App) : App;
