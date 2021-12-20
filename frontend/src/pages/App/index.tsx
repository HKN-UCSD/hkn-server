import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  SignInPage,
  // SignUpPage,
  PointsPage,
  InducteePointsPage,
  EventsPage,
  ProfilePage,
  ProfileEditPage,
  CalendarPage,
  EventEditPage,
  EventDetailsPage,
  EventSignInPage,
  EventRsvpPage,
  QrCodePage,
  QrCodeIntermediatePage,
  QueriedEventPage,
  InterviewSchedulingPage,
  ForbiddenPage,
  NotFoundPage,
  EventSignInOptionsPage,
  InductionClassPage,
  InductionClassCreationPage,
  InductionClassDetailsPage,
  InductionClassEditPage,
  InducteeSignUpPage,
  EditRolesPage,
} from '@Pages';
import { Loading } from '@SharedComponents';
import { UserContext, UserContextValues } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { getUserRole } from '@Services/UserService';
import {
  AdminRoutingPermission,
  InducteeRoutingPermission,
  OfficerRoutingPermission,
} from '@HOCs/RoutingPermissions';
import ApiConfigStore, { emptyGetTokenFunc } from '@Services/ApiConfigStore';
import { config } from '@Config';

const queryClient = new QueryClient();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={userClaims}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={ROUTES.SIGN_IN}
              render={() => <SignInPage setClaims={setClaims} />}
            />
            {/* <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} /> */}
            <Route
              exact
              path={ROUTES.INDUCTEE_SIGN_UP}
              render={() => <InducteeSignUpPage />}
            />
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
              path={ROUTES.EVENT_SIGN_IN_OPTIONS}
              render={() => <EventSignInOptionsPage />}
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
              render={props =>
                InducteeRoutingPermission(EventDetailsPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.EVENT_EDIT}
              render={props => OfficerRoutingPermission(EventEditPage)(props)}
            />
            <Route
              exact
              path={ROUTES.EVENT_QRCODE}
              render={() => <QrCodePage />}
            />
            <Route
              exact
              path={ROUTES.EVENT_QRCODE_INTERMEDIATE}
              render={() => <QrCodeIntermediatePage />}
            />
            <Route
              exact
              path={ROUTES.INDUCTION_CLASS_GENERAL}
              render={props =>
                OfficerRoutingPermission(InductionClassPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.INDUCTION_CLASS_CREATE}
              render={props =>
                OfficerRoutingPermission(InductionClassCreationPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.INDUCTION_CLASS_DETAILS}
              render={props =>
                OfficerRoutingPermission(InductionClassDetailsPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.INDUCTION_CLASS_EDIT}
              render={props =>
                OfficerRoutingPermission(InductionClassEditPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.FORBIDDEN}
              render={props => InducteeRoutingPermission(ForbiddenPage)(props)}
            />
            <Route
              exact
              path={ROUTES.NOT_FOUND}
              render={props => InducteeRoutingPermission(NotFoundPage)(props)}
            />
            <Route
              exact
              path={ROUTES.PROFILE}
              render={props => InducteeRoutingPermission(ProfilePage)(props)}
            />
            <Route
              exact
              path={ROUTES.PROFILE_EDIT}
              render={props =>
                InducteeRoutingPermission(ProfileEditPage)(props)
              }
            />
            <Route
              exact
              path={ROUTES.EDIT_ROLES}
              render={props => AdminRoutingPermission(EditRolesPage)(props)}
            />
            <Route render={() => <Redirect to={ROUTES.HOME} />} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default config.nodeEnv === 'development' ? hot(App) : App;
