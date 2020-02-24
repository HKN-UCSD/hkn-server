import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import HomePage from '../Home';
import Loading from '../Loading';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../../contexts';

import { withFirebase } from '../../services/Firebase';

const INITIAL_STATES = {
  authUser: null,
  isLoading: true,
};

const PrivateRoute = withFirebase(
  ({ firebase, component: Component, ...otherProps }) => (
    <Route
      {...otherProps}
      render={props =>
        firebase.auth.currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.SIGN_IN} />
        )
      }
    />
  )
);

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(React.Component).isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.listener = firebase.auth.onAuthStateChanged(user => {
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
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <PrivateRoute path={ROUTES.HOME} component={HomePage} />
          </Switch>
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);
