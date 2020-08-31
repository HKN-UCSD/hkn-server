import React from 'react';
import { Avatar, Card, Grid, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from './components/SignUpForm';
import styles from './styles';

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
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Card elevation={3} className={classes.card}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignUpPage);
