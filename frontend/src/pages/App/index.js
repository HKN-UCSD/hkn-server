import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
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
} from '@Pages';
import { Loading } from '@SharedComponents';
import { UserContext } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { getRolesFromClaims } from '@Services/claims';
import {
  InducteeRoutingPermission,
  OfficerRoutingPermission,
} from '@HOCs/RoutingPermissions';
import ApiConfigStore from '@Services/ApiConfigStore';

const INITIAL_STATES = {
  userClaims: null,
  userToken: null,
  isLoading: true,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const { claims, token } = tokenResult;

        this.setState({
          userClaims: {
            userId: claims.user_id,
            userRoles: getRolesFromClaims(claims),
          },
          userToken: token,
          isLoading: false,
        });
      } else {
        this.setState({
          userClaims: null,
          userToken: null,
          isLoading: false,
        });
      }
    });
  }

  setClaims = claims => {
    const { userToken } = this.state;

    ApiConfigStore.setToken(userToken);

    this.setState({
      userClaims: {
        userId: claims.user_id,
        userRoles: getRolesFromClaims(claims),
      },
    });
  };

  render() {
    const { userClaims, isLoading } = this.state;

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
              render={() => <SignInPage setClaims={this.setClaims} />}
            />
            <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
            <Route
              exact
              path={ROUTES.EVENT_SIGN_IN}
              render={props => <EventSignInPage {...props} />}
            />
            <Route
              exact
              path={ROUTES.EVENT_RSVP}
              render={props => <EventRsvpPage {...props} />}
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
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
