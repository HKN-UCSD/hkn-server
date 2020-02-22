import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import HomePage from '../Home';
import Loading from '../Loading';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import { withFirebase } from '../Firebase';

const INITIAL_STATES = {
  authUser: null,
  isLoading: true,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
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
            <Route path={ROUTES.HOME} component={HomePage} />
          </Switch>
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authUser: user,
          authenticated: true,
          isLoading: false,
        });
      } else {
        this.setState({
          authUser: null,
          authenticated: false,
          isLoading: false,
        });
      }
    });
  }
}

export default withFirebase(App);
