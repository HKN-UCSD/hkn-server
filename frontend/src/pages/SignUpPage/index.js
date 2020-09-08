import React from 'react';
import { Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from './components/SignUpForm';
import styles from './styles';

import { Card } from '@SharedComponents';
import { PublicPageLayout } from '@SharedComponents/layouts';
import { createUserAccountFromSignup } from '@Services/auth';
import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';

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
      <PublicPageLayout>
        <Card className={classes.card}>
          <Grid
            container
            className={classes.cardContent}
            alignItems='center'
            direction='column'
            spacing={2}
          >
            <Grid item>
              <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
            </Grid>
            <Grid item>
              <SignUpForm handleSubmit={this.handleSubmit} />
            </Grid>
          </Grid>
        </Card>
      </PublicPageLayout>
    );
  }
}

export default withStyles(styles)(SignUpPage);
