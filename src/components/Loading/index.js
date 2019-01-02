import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 3,
    },
})

class Loading extends React.Component {
    state = {
        completed: 0,
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    progress = () => {
        const { completed } = this.state
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                />
            </div>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading)