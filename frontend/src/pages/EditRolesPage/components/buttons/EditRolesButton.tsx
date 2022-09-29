import React, { Profiler } from 'react';
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
import { updateUserById } from '@Services/UserService';
import { AppUserPostRequest } from '@Services/api';

interface EditRolesButtonProps {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
}
interface INITIAL_STATES {
  isPopupOpen?: boolean;
  id?: number;
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
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
      role: props.role,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    };
    this.handleEditRolePopup = this.handleEditRolePopup.bind(this);
    this.handleEditRoleClose = this.handleEditRoleClose.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
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
  async updateUserRole(newRole) {
    const updatedUser: AppUserPostRequest = {
      role: newRole,
      email: this.state.email!,
      firstName: this.state.firstName!,
      lastName: this.state.lastName!,
    };
    try {
      await updateUserById(this.state.id!, updatedUser);
      this.setState({
        role: newRole,
      });
    } catch (error) {}
    window.location.reload();
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
            Change role for {this.state.firstName + ' ' + this.state.lastName} (
            {this.state.role})
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.updateUserRole('guest')}
              color='primary'
            >
              Guest
            </Button>
            <Button
              onClick={() => this.updateUserRole('inductee')}
              color='primary'
            >
              Inductee
            </Button>
            <Button
              onClick={() => this.updateUserRole('member')}
              color='primary'
            >
              Member
            </Button>
            <Button
              onClick={() => this.updateUserRole('officer')}
              color='primary'
            >
              Officer
            </Button>
            <Button
              onClick={() => this.updateUserRole('admin')}
              color='primary'
            >
              Administrator
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditRolesButton;
