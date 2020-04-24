import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import PointsPage from '../PointsPage';
import InducteePointsPage from '../InducteePointsPage';
import ResumePage from '../ResumePage';
import EventsPage from '../EventsPage';

import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from '../../contexts';

// PrivateRoute can be used just like a normal Route from react-router-dom
// With a PrivateRoute, if the user is not logged in then they will be
// automatically redirected to the Sign In Page
// If the nav prop is true, then the component will be rendered with a navbar.
const PrivateRoute = ({ nav, component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => {
      if (firebase.auth().currentUser) {
        if (nav) {
          return (
            <NavBar>
              <Component {...props} />
            </NavBar>
          );
        }
        return <Component {...props} />;
      }
      return <Redirect to={ROUTES.SIGN_IN} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(React.Component).isRequired,
  nav: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  nav: false,
};

const INITIAL_STATES = {
  authUser: null,
  isLoading: true,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authUser: user,
          isLoading: false,
        });
      } else {
        this.setState({
          authUser: null,
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { authUser, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <AuthUserContext.Provider value={authUser}>
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <PrivateRoute exact nav path={ROUTES.HOME} component={EventsPage} />
            <PrivateRoute
              exact
              nav
              path={ROUTES.POINTS}
              component={PointsPage}
            />
            <PrivateRoute
              exact
              nav
              path={ROUTES.RESUME}
              component={ResumePage}
            />
            <PrivateRoute
              exact
              nav
              path={ROUTES.INDUCTEES}
              component={InducteePointsPage}
            />
          </Switch>
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default App;
