import React from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment';

import { Avatar, Button, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from '../../components/SignUpForm';

import HKN_TRIDENT_LOGO from '../../images/hkn-trident.png';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

const INITIAL_STATE = {};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = (values, setSubmitting) => {
    const signUpSubmission = {
      ...values,
      gradYear: moment().year(values.gradYear),
    };

    console.log(JSON.stringify(signUpSubmission));

    setSubmitting(false);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.signUpCard} elevation={3}>
          <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
          <SignUpForm handleSubmit={this.handleSubmit} />
          <Button
            className={classes.redirectToSignIn}
            to={ROUTES.SIGN_IN}
            component={Link}
          >
            Have an Account Already?
          </Button>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);
