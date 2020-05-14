import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import PointsPage from '../PointsPage';
import InducteePointsPage from '../InducteePointsPage';
import ResumePage from '../ResumePage';
import EventsPage from '../EventsPage';
import CalendarPage from '../CalendarPage';

import Loading from '../../components/Loading';
import {
  OfficerPermissions,
  InducteePermissions,
} from '../../HOCs/Permissions';
import { AuthUserContext } from '../../contexts';
import * as ROUTES from '../../constants/routes';
import { ClaimsSingleton } from '../../services/claims';

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
          authUserClaims: claims,
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
              component={InducteePermissions(EventsPage)}
            />
            <Route
              exact
              path={ROUTES.POINTS}
              component={InducteePermissions(PointsPage)}
            />
            <Route
              exact
              path={ROUTES.RESUME}
              component={InducteePermissions(ResumePage)}
            />
            <Route
              exact
              path={ROUTES.INDUCTEES}
              component={OfficerPermissions(InducteePointsPage)}
            />
            <Route
              exact
              path={ROUTES.CALENDAR}
              component={InducteePermissions(CalendarPage)}
            />
          </Switch>
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default App;
