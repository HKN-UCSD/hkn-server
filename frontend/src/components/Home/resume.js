import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PdfIcon from '@material-ui/icons/PictureAsPdf'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Grid from '@material-ui/core/Grid'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const styles = theme => ({
    root: {
        width: 'auth',
        display: 'block',
        maraginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    pdfIcon: {
        fontSize: '200px',
    },
    contentWrapper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
    },
    description: {
        align: 'center',
        fontSize: '16px',
    },
    button: {
        margin: theme.spacing.unit,
        width: '120px',
        item: 'true',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: theme.spacing.unit * 3,
    },
    fileInput: {
        display: 'none',
    }
})

const INITIAL_STATES = {
    uploaded: false,
    filename: '',
    timestamp: '',
    successfulUploadDialogOpen: false,
    successfulDeleteDialogOpen: false,
    confirmDeleteDialogOpen: false,
    errorDialogOpen: false,
    error: null,
}

class ResumeContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATES }

        this.props.firebase
            .getUserDocument()
            .then(docSnapshot => {
                if (!docSnapshot.exists) {
                    throw Error('User document does not exist.')
                }

                return docSnapshot.data()
            })
            .then(data => {
                if (data.resumeUploadTimestamp == null || data.resumeFilename == null) {
                    throw Error('Resume data does not exist.')
                }

                this.setState({
                    uploaded: true,
                    timestamp: this.getTimestampString(data.resumeUploadTimestamp),
                    filename: data.resumeFilename,
                })
            })
            .catch(error => { })
    }

    getTimestampString = timestamp => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = new Date(timestamp)

        return monthNames[date.getMonth()] +
            ' ' +
            date.getDate() +
            ' ' +
            date.getFullYear() +
            ' ' +
            date.getHours() +
            ':' +
            date.getMinutes() +
            ':' +
            date.getSeconds()
    }

    handleUpload = event => {
        this.fileInput.click()
    }

    handleOpenFile = event => {
        const resumeFile = this.fileInput.files[0]

        const timestamp = new Date().getTime()

        this.props.firebase
            .uploadResume(resumeFile)
            .then(snapshot => {
                return this.props.firebase.updateResumeFields(resumeFile.name, timestamp)
            })
            .then(() => {
                this.setState({
                    successfulUploadDialogOpen: true,
                    timestamp: this.getTimestampString(timestamp),
                    filename: resumeFile.name,
                    uploaded: true,
                })
            })
            .catch(error => {
                this.setState({
                    error,
                    errorDialogOpen: true,
                })
            })

        event.preventDefault()
    }

    handleSuccessfulUploadDialogClose = event => {
        this.setState({
            successfulUploadDialogOpen: false,
        })
    }

    handleErrorDialogClose = event => {
        this.setState({
            error: null,
            errorDialogOpen: false,
        })
    }

    handleDelete = event => {
        this.setState({
            confirmDeleteDialogOpen: true,
        })
    }

    handleConfirmDelete = event => {
        this.props.firebase
            .deleteResume(this.state.filename)
            .then(() => {
                return this.props.firebase.removeResumeFields()
            })
            .then(() => {
                this.setState({
                    confirmDeleteDialogOpen: false,
                    successfulDeleteDialogOpen: true,
                    filename: '',
                    timestamp: '',
                    uploaded: false,
                })
            })
            .catch(error => {
                this.setState({
                    confirmDeleteDialogOpen: false,
                    error,
                    errorDialogOpen: true,
                })
            })
    }

    handleConfirmDeleteDialogClose = event => {
        this.setState({
            confirmDeleteDialogOpen: false,
        })
    }

    handleSuccessfulDeleteDialogClose = event => {
        this.setState({
            successfulDeleteDialogOpen: false,
        })
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.contentWrapper}>
                    <PdfIcon className={this.props.classes.pdfIcon} color='disabled' />
                    <Typography variant='caption' className={this.props.classes.description}>
                        {this.state.uploaded ? this.state.filename + ' ' + this.state.timestamp : 'Oops, we can not find your resume'}
                    </Typography>
                    <div className={this.props.classes.buttonsContainer}>
                        <Button
                            disabled={!this.state.uploaded}
                            variant='contained'
                            color='secondary'
                            className={this.props.classes.button}
                            onClick={this.handleDelete}
                        >
                            DELETE
                    <DeleteIcon className={this.props.classes.rightIcon} />
                        </Button>
                        <Button
                            variant='contained'
                            color='default'
                            className={this.props.classes.button}
                            onClick={this.handleUpload}
                        >
                            UPLOAD
                    <CloudUploadIcon className={this.props.classes.rightIcon} />
                        </Button>
                    </div>
                </div>
                <div>
                    <input ref={input => this.fileInput = input} accept='application/pdf' type='file' className={this.props.classes.fileInput} onChange={this.handleOpenFile} />
                    <Dialog
                        open={this.state.successfulUploadDialogOpen}
                        onClose={this.handleSuccessfulUploadDialogClose}
                        aria-labelledby='alert-dialog-title'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Success'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-descrption'>
                                We have received your resume, thank you!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSuccessfulUploadDialogClose} color='primary'>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.errorDialogOpen}
                        onClose={this.errorUploadDialogClose}
                        aria-labelledby='alert-dialog-title'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Error'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-descrption'>
                                {this.state.error ? this.state.error.message : ''}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleErrorDialogClose} color='primary'>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.successfulUploadDialogOpen}
                        onClose={this.handleSuccessfulUploadDialogClose}
                        aria-labelledby='alert-dialog-title'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Success'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-descrption'>
                                We have received your resume, thank you!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSuccessfulUploadDialogClose} color='primary'>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.confirmDeleteDialogOpen}
                        onClose={this.handleConfirmDeleteDialogClose}
                        aria-labelledby='alert-dialog-title'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Confirm'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-descrption'>
                                {'Are you sure you would like to delete ' + this.state.filename + '?'}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleConfirmDeleteDialogClose} color='primary'>
                                NO
                            </Button>
                            <Button onClick={this.handleConfirmDelete} color='primary'>
                                YES
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.successfulDeleteDialogOpen}
                        onClose={this.handleSuccessfulDeleteDialogClose}
                        aria-labelledby='alert-dialog-title'
                    >
                        <DialogTitle id='alert-dialog-title'>{'Success'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-descrption'>
                                You have deleted your resume file from our database.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSuccessfulDeleteDialogClose} color='primary'>
                                GOT IT
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >
        )
    }
}

ResumeContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles), withFirebase)(ResumeContent)