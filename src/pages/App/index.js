import React from 'react';
import PropTypes from 'prop-types';
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
