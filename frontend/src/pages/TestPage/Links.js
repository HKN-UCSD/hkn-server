import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import
{
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Link,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: grey[200],
    width: 200,
    height: 250,
  },
  title: {
    backgroundColor: grey[400],
  },
  list_item_text: {
    fontSize: '20px',
  }
});

class Links extends React.Component
{

  render()
  {
    const { rsvp, signin, canva, facebook } = this.props;
    const { classes } = this.props;

    // .map for list
    return (
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title} align="center">
          Links
        </Typography>

        <List dense={1}>
          <ListItem className={classes.list_item}>
            <Link href={rsvp}>
              <ListItemText classes={{ primary: classes.list_item_text }} primary="RSVP" />
            </Link>
          </ListItem>
          <ListItem className={classes.list_item}>
            <Link href={signin}>
              <ListItemText classes={{ primary: classes.list_item_text }} primary="Sign In" />
            </Link>
          </ListItem>
          <ListItem className={classes.list_item}>
            <Link href={canva}>
              <ListItemText classes={{ primary: classes.list_item_text }} primary="Canva" />
            </Link>
          </ListItem>
          <ListItem className={classes.list_item}>
            <Link href={facebook}>
              <ListItemText classes={{ primary: classes.list_item_text }} primary="Facebook" />
            </Link>
          </ListItem>
        </List>
      </div>
    )
  }
}

export default compose(withStyles(styles))(Links);