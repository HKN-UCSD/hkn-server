import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
} from '@Pages';
import { Loading } from '@SharedComponents';
import { AuthUserContext } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { ClaimsSingleton } from '@Services/claims';

import {
  InducteeRoutingPermission,
  OfficerRoutingPermission,
} from '@HOCs/RoutingByContextPerm';

const INITIAL_STATES = {
  authUser: null,
  authUserClaims: null,
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
        const { claims } = tokenResult;

        ClaimsSingleton.setClaims(claims);
        this.setState({
          authUserClaims: Object.keys(claims),
          isLoading: false,
        });
      } else {
        ClaimsSingleton.setClaims({});
        this.setState({
          authUserClaims: null,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { authUserClaims, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <AuthUserContext.Provider value={authUserClaims}>
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.SIGN_IN} render={() => <SignInPage />} />
            <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
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
      </AuthUserContext.Provider>
    );
  }
}

export default App;
