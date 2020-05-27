import React from 'react';
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
  },
  title: {
    backgroundColor: grey[400],
  },
  list_item_text: {
    fontSize: '16px',
  }
});

function Links(props)
{
  let { classes, urls } = props;
  let { fb, canva, rsvp, signin } = urls;

  // .map for list
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title} align="center">
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
          <Link href={fb}>
            <ListItemText classes={{ primary: classes.list_item_text }} primary="Facebook" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles)(Links);