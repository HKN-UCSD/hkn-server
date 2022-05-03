import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import {
  AppUserResponse,
  AppUserInterviewAvailability,
  InterviewDatesResponse,
} from '@Services/api';
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
import { getUserById } from '@Services/UserService';

interface EditRolesButtonProps {
  id: number;
  name: string;
}
interface INITIAL_STATES {
  isPopupOpen?: boolean;
  id?: number;
  name?: string;
}

class EditRolesButton extends React.Component<
  EditRolesButtonProps,
  INITIAL_STATES
> {
  constructor(props: EditRolesButtonProps) {
    super(props);

    this.state = {
      isPopupOpen: false,
      id: props.id,
      name: props.name,
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
  //const res: AppUserResponse = await getUserById(parseInt(userId, 10));
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
          <DialogTitle id='alert-dialog-title'>
            Change role for {this.state.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              What role do you want this user to be? {this.state.id}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default EditRolesButton;
