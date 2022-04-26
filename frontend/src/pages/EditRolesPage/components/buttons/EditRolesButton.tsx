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
interface INITIAL_STATES {
  isPopupOpen?: boolean;
}

class EditRolesButton extends React.Component<
  EditRolesButtonProps,
  INITIAL_STATES
> {
  constructor(props: EditRolesButtonProps) {
    super(props);

    this.state = {
      isPopupOpen: false,
    };
    this.handleEditRolePopup = this.handleEditRolePopup.bind(this);
    this.handleEditRoleClose = this.handleEditRoleClose.bind(this);
  }

  handleEditRolePopup() {
    this.setState({
      isPopupOpen: true,
    });
  }
  handleEditRoleClose() {
    this.setState({
      isPopupOpen: false,
    });
  }

  render() {
    return (
      <div>
        <Button positive primary onClick={this.handleEditRolePopup}>
          Edit Role
        </Button>
        <Dialog
          open={this.state.isPopupOpen!}
          onClose={this.handleEditRoleClose}
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
  }
}
/*
const EditRolesButton = ({ id }: EditRolesButtonProps) => {
  this.state = {...INITIAL_STATES};
  var isEditRolePopupOpen = false;
  //const history = useHistory();
  const handleEditRolePopup = () => {
    this.setState;
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
*/

export default EditRolesButton;
