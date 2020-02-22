import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const MainDrawerItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AttachmentIcon />
      </ListItemIcon>
      <ListItemText primary='Resume' />
    </ListItem>
  </div>
);

export const SecondaryDrawerItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary='Profile' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <ListItemText primary='Logout' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary='Total Points' />
    </ListItem>
  </div>
);
