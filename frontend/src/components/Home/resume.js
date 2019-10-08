import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import PdfIcon from '@material-ui/icons/PictureAsPdf'

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
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    pdfIcon: {
        fontSize: '200px',
    },
    contentWrapper: {
        marginTop: theme.spacing.unit * 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: "100vh",
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    description: {
        align: 'center',
        fontSize: '16px',
        marginTop: theme.spacing.unit,
        whiteSpace: 'pre-wrap',
        textAlign: 'center',


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

const RIGHT_BUTTON_ACTIONS = {
    UPLOAD: 'UPLOAD',
    DOWNLOAD: 'DOWNLOAD',
}

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
}

class ResumeContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATES }

    }

    componentDidMount() {
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
                
                let uid = this.props.firebase.auth.currentUser.uid
                let fileName = data.resumeFilename

                this.setState({
                    uploaded: true,
                    rightButtonAction: RIGHT_BUTTON_ACTIONS.DOWNLOAD,
                    timestamp: this.getTimestampString(data.resumeUploadTimestamp),
                    filename: data.resumeFilename,
                })
                
                let path = 'users/'+uid+'/resume/'+fileName
                
                console.log(path)

                let fileRef = this.props.firebase.storage.ref(path);

                return fileRef.getDownloadURL()
            })
            .then(url => {
                console.log(url)
                this.setState({
                    resumeDownloadURL: url,
                })
            })
            .catch(error => {console.log('ERROR:'+error)})
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
            (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) +
            ':' +
            (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) +
            ':' +
            (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
    }

    // getRightButtionIcon = () => {
    //     switch (this.state.rightButtonAction) {
    //         case RIGHT_BUTTON_ACTIONS.DOWNLOAD:
    //             return <CloudDownloadIcon className={this.props.classes.rightIcon} />
    //         case RIGHT_BUTTON_ACTIONS.UPLOAD:
    //             return <CloudUploadIcon className={this.props.classes.rightIcon} />
    //         default:
    //             return null
    //     }
    // }

    validateFileSize = file =>
        new Promise((resolve, reject) => {
            resolve(file.size <= 1 * 1024 * 1024)
        })

    handleUpload = event => {
        this.fileInput.click()
    }

    handleDownload = event => {
        window.open(this.state.resumeDownloadURL)
    }

    handleOpenFile = event => {
        const resumeFile = this.fileInput.files[0]

        const timestamp = new Date().getTime()

        this.validateFileSize(resumeFile)
            .then(isCorrectSize => {
                if (!isCorrectSize) {
                    throw Error('File size must be less than or equal to 1 MB.')
                }
                return this.props.firebase.uploadResume(resumeFile)
            })
            .then(snapshot => {
                return snapshot.ref.getDownloadURL()
            })
            .then(downloadUrl => {
                this.setState({
                    resumeDownloadURL: downloadUrl,
                })
                return this.props.firebase.updateResumeFields(resumeFile.name, timestamp, downloadUrl)
            })
            .then(() => {
                if (this.state.uploaded && resumeFile.name !== this.state.filename) {
                    return this.props.firebase.deleteResume(this.state.filename)
                }
            })
            .then(() => {
                this.setState({
                    successfulUploadDialogOpen: true,
                    timestamp: this.getTimestampString(timestamp),
                    filename: resumeFile.name,
                    uploaded: true,
                    rightButtonAction: RIGHT_BUTTON_ACTIONS.DOWNLOAD,
                })
            })
            .catch(error => {
                if (error.code === 'storage/unauthorized') {
                    error = Error('Please make sure the uploaded file is .pdf file and less than or equal to 1 MB.')
                }

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
        this.setState({ errorDialogOpen: false })
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
            filename: '',
            timestamp: '',
            uploaded: false,
            rightButtonAction: RIGHT_BUTTON_ACTIONS.UPLOAD,
        })
    }

    getRightButton = () => {
        switch (this.state.rightButtonAction) {
            case RIGHT_BUTTON_ACTIONS.DOWNLOAD:
                return (
                    <Button
                        variant='contained'
                        color={this.state.uploaded ? 'default' : 'disabled'}
                        className={this.props.classes.button}
                        onClick={this.handleDownload}
                        disabled={!this.state.uploaded}
                    >
                        DOWNLOAD
                        <CloudDownloadIcon className={this.props.classes.rightIcon} />    
                    </Button>
                )
            case RIGHT_BUTTON_ACTIONS.UPLOAD:
                return (
                    <Button
                        variant='contained'
                        color={this.state.uploaded ? 'disabled' : 'primary'}
                        className={this.props.classes.button}
                        onClick={this.handleUpload}
                        disabled={this.state.uploaded}
                    >
                        UPLOAD
                        <CloudUploadIcon className={this.props.classes.rightIcon} />    
                    </Button>
                )
            default:
                return null
        }
    }

    getResumeDisplayComponent = () => {
        if (this.state.uploaded) {
            return (<iframe 
                        frameBorder="0" 
                        src={this.state.resumeDownloadURL}
                        width="100%"
                        height="80%" 
                    />)
        } else {
            return (<PdfIcon className={this.props.classes.pdfIcon} color='disabled' />)
        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.contentWrapper}>
                    { this.getResumeDisplayComponent() }
                    <Typography variant='body1' className={this.props.classes.description}>
                        {this.state.uploaded ? this.state.filename + "\n" + this.state.timestamp : 'Oops, we can not find your resume'}
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
                        {this.getRightButton()}
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