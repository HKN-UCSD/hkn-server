import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PdfIcon from '@material-ui/icons/PictureAsPdf';

import { compose } from 'recompose';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { getCurrentUserDocument } from '@services/user';
import {
  getDownload,
  uploadResume,
  updateResumeFields,
  deleteResume,
  removeResumeFields,
} from '@services/resume';

const styles = theme => ({
  root: {
    width: 'auth',
    display: 'block',
    maraginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  pdfIcon: {
    fontSize: '200px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  description: {
    align: 'center',
    fontSize: '16px',
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
    width: '120px',
    item: 'true',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
});

const RIGHT_BUTTON_ACTIONS = {
  UPLOAD: 'UPLOAD',
  DOWNLOAD: 'DOWNLOAD',
};

const INITIAL_STATES = {
  uploaded: false,
  rightButtonAction: RIGHT_BUTTON_ACTIONS.UPLOAD,
  filename: '',
  timestamp: '',
  successfulUploadDialogOpen: false,
  successfulDeleteDialogOpen: false,
  confirmDeleteDialogOpen: false,
  errorDialogOpen: false,
  error: null,
  resumeDownloadURL: null,
};

class ResumePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATES };
  }

  componentDidMount() {
    getCurrentUserDocument()
      .then(data => {
        if (data.resumeUploadTimestamp == null || data.resumeFilename == null) {
          throw Error('Resume data does not exist.');
        }

        const { uid } = data;
        const fileName = data.resumeFilename;

        this.setState({
          uploaded: true,
          rightButtonAction: RIGHT_BUTTON_ACTIONS.DOWNLOAD,
          timestamp: this.getTimestampString(data.resumeUploadTimestamp),
          filename: data.resumeFilename,
        });

        const path = `users/${uid}/resume/${fileName}`;

        return getDownload(path);
      })
      .then(url => {
        this.setState({
          resumeDownloadURL: url,
        });
      })
      .catch(error => {
        console.log(`ERROR:${error}`);
      });
  }

  getTimestampString = timestamp => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(timestamp);

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()} ${
      date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    }:${
      date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    }:${date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`}`;
  };

  validateFileSize = file =>
    // eslint-disable-next-line no-unused-vars
    new Promise((resolve, _ignore) => {
      resolve(file.size <= 1 * 1024 * 1024);
    });

  handleUpload = () => {
    this.fileInput.click();
  };

  setFileInput = input => {
    this.fileInput = input;
  };

  handleDownload = () => {
    const { resumeDownloadURL } = this.state;
    window.open(resumeDownloadURL);
  };

  handleOpenFile = event => {
    const resumeFile = this.fileInput.files[0];
    const { uploaded, filename } = this.state;

    const timestamp = new Date().getTime();

    this.validateFileSize(resumeFile)
      .then(isCorrectSize => {
        if (!isCorrectSize) {
          throw Error('File size must be less than or equal to 1 MB.');
        }
        return uploadResume(resumeFile);
      })
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadUrl => {
        this.setState({
          resumeDownloadURL: downloadUrl,
        });
        return updateResumeFields(resumeFile.name, timestamp, downloadUrl);
      })
      .then(() => {
        if (uploaded && resumeFile.name !== filename) {
          return deleteResume(filename);
        }
        return null;
      })
      .then(() => {
        this.setState({
          successfulUploadDialogOpen: true,
          timestamp: this.getTimestampString(timestamp),
          filename: resumeFile.name,
          uploaded: true,
          rightButtonAction: RIGHT_BUTTON_ACTIONS.DOWNLOAD,
        });
      })
      .catch(error => {
        let localError = error;
        if (error.code === 'storage/unauthorized') {
          localError = Error(
            'Please make sure the uploaded file is .pdf file and less than or equal to 1 MB.'
          );
        }

        this.setState({
          error: localError,
          errorDialogOpen: true,
        });
      });

    event.preventDefault();
  };

  handleSuccessfulUploadDialogClose = () => {
    this.setState({
      successfulUploadDialogOpen: false,
    });
  };

  handleErrorDialogClose = () => {
    this.setState({ errorDialogOpen: false });
  };

  handleDelete = () => {
    this.setState({
      confirmDeleteDialogOpen: true,
    });
  };

  handleConfirmDelete = () => {
    const { filename } = this.state;

    deleteResume(filename)
      .then(() => {
        return removeResumeFields();
      })
      .then(() => {
        this.setState({
          confirmDeleteDialogOpen: false,
          successfulDeleteDialogOpen: true,
        });
      })
      .catch(error => {
        this.setState({
          confirmDeleteDialogOpen: false,
          error,
          errorDialogOpen: true,
        });
      });
  };

  handleConfirmDeleteDialogClose = () => {
    this.setState({
      confirmDeleteDialogOpen: false,
    });
  };

  handleSuccessfulDeleteDialogClose = () => {
    this.setState({
      successfulDeleteDialogOpen: false,
      filename: '',
      timestamp: '',
      uploaded: false,
      rightButtonAction: RIGHT_BUTTON_ACTIONS.UPLOAD,
    });
  };

  getRightButton = () => {
    const { rightButtonAction, uploaded } = this.state;
    const { classes } = this.props;

    switch (rightButtonAction) {
      case RIGHT_BUTTON_ACTIONS.DOWNLOAD:
        return (
          <Button
            variant='contained'
            color={uploaded ? 'default' : 'disabled'}
            className={classes.button}
            onClick={this.handleDownload}
            disabled={!uploaded}
          >
            DOWNLOAD
            <CloudDownloadIcon className={classes.rightIcon} />
          </Button>
        );
      case RIGHT_BUTTON_ACTIONS.UPLOAD:
        return (
          <Button
            variant='contained'
            color={uploaded ? 'disabled' : 'primary'}
            className={classes.button}
            onClick={this.handleUpload}
            disabled={uploaded}
          >
            UPLOAD
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        );
      default:
        return null;
    }
  };

  getResumeDisplayComponent = () => {
    const { uploaded, resumeDownloadURL } = this.state;
    const { classes } = this.props;
    if (uploaded) {
      return (
        <iframe
          title='resume_display'
          frameBorder='0'
          src={resumeDownloadURL}
          width='100%'
          height='80%'
        />
      );
    }
    return <PdfIcon className={classes.pdfIcon} color='disabled' />;
  };

  render() {
    const {
      uploaded,
      filename,
      timestamp,
      successfulUploadDialogOpen,
      successfulDeleteDialogOpen,
      confirmDeleteDialogOpen,
      errorDialogOpen,
      error,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          {this.getResumeDisplayComponent()}
          <Typography variant='body1' className={classes.description}>
            {uploaded
              ? `${filename}\n${timestamp}`
              : 'Oops, we can not find your resume'}
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button
              disabled={!uploaded}
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={this.handleDelete}
            >
              DELETE
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            {this.getRightButton()}
          </div>
        </div>
        <div>
          <input
            ref={input => this.setFileInput(input)}
            accept='application/pdf'
            type='file'
            className={classes.fileInput}
            onChange={this.handleOpenFile}
          />
          <Dialog
            open={successfulUploadDialogOpen}
            onClose={this.handleSuccessfulUploadDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-descrption'>
                We have received your resume, thank you!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSuccessfulUploadDialogClose}
                color='primary'
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={errorDialogOpen}
            onClose={this.errorUploadDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-descrption'>
                {error ? error.message : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleErrorDialogClose} color='primary'>
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={successfulUploadDialogOpen}
            onClose={this.handleSuccessfulUploadDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-descrption'>
                We have received your resume, thank you!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSuccessfulUploadDialogClose}
                color='primary'
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={confirmDeleteDialogOpen}
            onClose={this.handleConfirmDeleteDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-descrption'>
                {`Are you sure you would like to delete ${filename}?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleConfirmDeleteDialogClose}
                color='primary'
              >
                NO
              </Button>
              <Button onClick={this.handleConfirmDelete} color='primary'>
                YES
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={successfulDeleteDialogOpen}
            onClose={this.handleSuccessfulDeleteDialogClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-descrption'>
                You have deleted your resume file from our database.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSuccessfulDeleteDialogClose}
                color='primary'
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles))(ResumePage);
