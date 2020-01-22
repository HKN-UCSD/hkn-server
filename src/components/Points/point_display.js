import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

class PointDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props
    }
  }

  componentDidUpdate() {
    if(this.state.points !== this.props.points) {
      this.setState({
        points: this.props.points
      })
    }
  }
  // componentWillReceiveProps(newProps) { this.setState(newProps); }

  render() {
    return (
      <div>
        {this.state.points.length > 0 ?
          <div>
            <Grid container spacing={2}>
              {this.state.points.map((event, key) => {
                return <Grid item xs={3} key={key}>
                  <Card className={this.props.classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {event.event_name}
                      </Typography>
                      <Typography className={this.props.classes.pos} color="textSecondary">
                        {`${months_arr[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {`Officer: ${event.officer}`}
                        <br />
                        {`Points: ${event.value}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              })}
            </Grid>
          </div> : <div>None</div>}
      </div>
    )
  }
}
export default compose(withStyles(styles))(PointDisplay)