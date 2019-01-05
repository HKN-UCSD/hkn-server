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
        marginTop: theme.spacing.unit * 3,
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
})

const INITIAL_STATES = {
    descriptionText: 'You have not upload a resume yet',
    uploaded: false,
}

class ResumeContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = ({ ...INITIAL_STATES })
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.contentWrapper}>
                    <PdfIcon className={this.props.classes.pdfIcon} color='disabled' />
                    <Typography variant='caption' className={this.props.classes.description}>
                        {this.state.descriptionText}
                    </Typography>
                </div>
                <Grid container justify='center'>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={this.props.classes.button}
                    >
                        DELETE
                    <DeleteIcon className={this.props.classes.rightIcon} />
                    </Button>
                    <Button
                        variant='contained'
                        color='default'
                        className={this.props.classes.button}
                    >
                        UPLOAD
                    <CloudUploadIcon className={this.props.classes.rightIcon} />
                    </Button>
                </Grid>
            </div >
        )
    }
}

ResumeContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles), withFirebase)(ResumeContent)
