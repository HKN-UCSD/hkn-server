import React from 'react';

import { Avatar, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from '../../components/SignUpForm';

import { createUserAccountFromSignup } from '../../services/auth';
import HKN_TRIDENT_LOGO from '../../images/hkn-trident.png';
import styles from './styles';

const INITIAL_STATE = {};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = async (values, setSubmitting) => {
    const signupSubmission = {
      ...values,
    };

    await createUserAccountFromSignup(signupSubmission);

    setSubmitting(false);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.signUpCard} elevation={3}>
          <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
          <SignUpForm handleSubmit={this.handleSubmit} />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);
