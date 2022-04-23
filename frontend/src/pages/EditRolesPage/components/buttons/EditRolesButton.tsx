import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
} from '@material-ui/core';

interface EditRolesButtonProps {
  id: number;
}

const EditRolesButton = ({ id }: EditRolesButtonProps) => {
  var isEditRolePopupOpen = true;
  //const history = useHistory();
  const handleEditRolePopup = () => {
    isEditRolePopupOpen = true;
  };
  const handleCloseEditRolePopup = () => {
    isEditRolePopupOpen = false;
  };
  return (
    <div>
      <Button positive primary onClick={() => handleEditRolePopup}>
        Edit Role
      </Button>
      <Dialog
        open={isEditRolePopupOpen}
        onClose={handleCloseEditRolePopup}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Edit Role Popup</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            What role do you want this user to be?
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditRolesButton;
