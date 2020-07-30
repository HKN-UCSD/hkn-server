import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import PointsPage from '@pages/PointsPage';
import InducteePointsPage from '@pages/InducteePointsPage';
import ResumePage from '@pages/ResumePage';
import EventsPage from '@pages/EventsPage';
import CalendarPage from '@pages/CalendarPage';
import EventEditPage from '@pages/EventEditPage';
import EventDetailsPage from '@pages/EventDetailsPage';
// import ProfileEditPage from '@pages/ProfileEditPage';
// import ProfilePage from '@pages/ProfilePage';
import Loading from '@sharedComponents/Loading';
import { AuthUserContext } from '@src/contexts';
import * as ROUTES from '@constants/routes';
import { ClaimsSingleton } from '@services/claims';

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
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route
              exact
              path={ROUTES.HOME}
              component={InducteeRoutingPermission(EventsPage)}
            />
            <Route
              exact
              path={ROUTES.POINTS}
              component={InducteeRoutingPermission(PointsPage)}
            />
            <Route
              exact
              path={ROUTES.RESUME}
              component={InducteeRoutingPermission(ResumePage)}
            />
            <Route
              exact
              path={ROUTES.INDUCTEES}
              component={OfficerRoutingPermission(InducteePointsPage)}
            />
            <Route
              exact
              path={ROUTES.CALENDAR}
              component={InducteeRoutingPermission(CalendarPage)}
            />
            <Route
              exact
              path={ROUTES.EVENT_DETAILS}
              component={InducteeRoutingPermission(EventDetailsPage)}
            />
            <Route
              exact
              path={ROUTES.EVENT_EDIT}
              component={OfficerRoutingPermission(EventEditPage)}
            />
            {/* <Route
              exact
              path={ROUTES.PROFILE}
              component={InducteeRoutingPermission(ProfilePage)}
            />
            <Route
              exact
              path={ROUTES.PROFILE_EDIT}
              component={InducteeRoutingPermission(ProfileEditPage)}
            /> */}
          </Switch>
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default App;
