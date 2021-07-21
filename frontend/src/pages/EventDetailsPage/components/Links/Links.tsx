import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
} from '@material-ui/core';

import useStyles from './styles';

import { OfficerRenderPermission } from '@HOCs/RenderPermissions';

interface URLObject {
  url: string;
  label: string;
}

interface LinksProps {
  urls: {
    [key: string]: URLObject;
  };
  signIn: URLObject;
  rsvp: URLObject;
}

function Links(props: LinksProps) {
  const { urls, signIn, rsvp } = props;
  const classes = useStyles();

  const SignInLink = () => (
    <ListItem>
      <Link href={signIn.url}>
        <ListItemText
          classes={{ primary: classes.list_item_text }}
          primary={signIn.label}
        />
      </Link>
    </ListItem>
  );

  const RSVPLink = () => (
    <ListItem>
      <Link href={rsvp.url}>
        <ListItemText
          classes={{ primary: classes.list_item_text }}
          primary={rsvp.label}
        />
      </Link>
    </ListItem>
  );

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title} align='center'>
        Links
      </Typography>

      <List dense>
        {Object.values(urls).map(urlObj => {
          return (
            <ListItem key={urlObj.label}>
              <Link href={urlObj.url}>
                <ListItemText
                  classes={{ primary: classes.list_item_text }}
                  primary={urlObj.label}
                />
              </Link>
            </ListItem>
          );
        })}

        {OfficerRenderPermission(SignInLink)({})}
        {OfficerRenderPermission(RSVPLink)({})}
      </List>
    </div>
  );
}

export default Links;
