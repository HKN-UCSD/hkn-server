import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

// package for table
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// package for autocomplete
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItemText from '@material-ui/core/ListItemText';

// package for expansion panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// package for popover
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 9,
  },
  container: {
    maxHeight: 440,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansion_cell: {
    width: '30%',
  },
});

const columns = [
  {
    id: 'email',
    label: 'Inductee\u00a0Email',
    minWidth: 170,
    align: 'left',
    format: value => value.toLocaleString(),
  },
  {
    id: 'tot_point',
    label: 'Total\u00a0Points',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'mt_point',
    label: 'Mentorship\u00a0Points',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'pf_point',
    label: 'Professional\u00a0Points',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'event_list',
    label: 'List\u00a0of\u00a0Events',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'officer_list',
    label: 'List\u00a0of\u00a0Officers',
    minWidth: 200,
    align: 'left',
  },
];

class TotPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchUsers: [],
      searchEmailStr: '',
      page: 0,
      rowsPerPage: 10,
      anchorE1: null,
      buffer: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  // check for event data, get event data and pass in event data to show popover
  handleRowClick = (event, user) => {
    // console.log("Event object is: ")
    // console.log(event)
    // console.log("handle row click, prepare the events to show...")
    const { users } = this.state;
    const index = this.state.users.findIndex(
      item => item.userId === user.userId
    );
    // console.log("row of current user: "+index)
    const buffer = this.state.users[index].event_list;
    // console.log("buffer: "+buffer)
    // this.setState({anchorE1:event.currentTarget})

    // users[index].anchorE1 = event.currentTarget
    // console.log("users[index].event_list:" + users[index].event_list)

    // console.log("if user is updated: "+users[index].updated)
    if (users[index].updated === false) {
      // console.log("before query.....buffer: ")
      // console.log(user.event_list)
      this.props.firebase
        .getUserEvent(user.userId)
        .then(querySnapshot => {
          querySnapshot.forEach(function(doc) {
            // console.log("event name: "+doc.data().event_name);
            user.event_list.push(doc.data().event_name);
            // buffer.push(
            //     doc.data().event_name
            // );
          });
          // this.setState({users:users})
          // this.setState({searchUsers: this.state.searchUsers})
          return user.event_list;
        })
        .then(eventList => {
          // console.log("after query.....buffer: ")
          // console.log(eventList)

          this.setState({ anchorE1: event.currentTarget, buffer: eventList });
          users[index].updated = true;
        })
        .catch(function(error) {
          console.log('Error getting docs: ', error);
        });
    } else {
      // console.log("after query.....buffer: "+buffer)
      this.setState({ anchorE1: event.currentTarget, buffer });
    }
  };

  handleClose = () => {
    // console.log("close the popover")
    // let users = this.state.users;
    // console.log("user in handleClose: "+user)
    // let index = this.state.users.findIndex(item => item.userId === user.userId)
    // users[index].anchorE1=null;
    // console.log("users[index].anchorE1: "+Boolean(users[index].anchorE1))
    // this.setState({users: users})
    // this.setState({searchUsers: users})
    this.setState({ anchorE1: null, buffer: [] });
  };

  componentDidMount() {
    const currentComponent = this;
    const users = [];

    this.props.firebase
      .getInducteesInfo()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log("user id is *******  "+doc.id)

          const docPoints = doc.data().induction_points;
          const docMtPts = doc.data().mentorship;
          const docPfPts = doc.data().professional;
          const docOfficers = doc.data().officer_signs;

          users.push({
            userId: doc.id,
            email: doc.data().email,
            tot_point: docPoints || 0,
            mt_point: docMtPts ? 'Complete' : 'Incomplete',
            pf_point: docPfPts ? 'Complete' : 'Incomplete',
            event_list: [],
            officer_list: docOfficers || [],
            updated: false,
            anchorE1: null,
          });
        });
        currentComponent.setState({ users });
        currentComponent.setState({ searchUsers: users });
      })
      .catch(function(error) {
        console.log('Error getting docs: ', error);
      });

    // console.log("List of users is:");
    // console.log(users);
    // users = users.map(user=>{this.props.firebase.getUserEvent(user.userId).then(function(querySnapshot){
    //     querySnapshot.docs.forEach(function(doc) {
    //         console.log("user id is "+doc.id)
    //         user.event_list.push(
    //             doc.data().event_name
    //         );

    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting docs: ", error);
    // });
    // });
  }

  handleEmailClick(e) {
    let dataList = this.state.users;

    const searchStr = e.option.trim();

    dataList = dataList.filter(item => {
      if (searchStr !== '') {
        if (
          !item.email ||
          item.email.toUpperCase().indexOf(searchStr.toUpperCase()) === -1
        ) {
          return false;
        }
      }
      return true;
    });

    this.setState({
      searchUsers: dataList,
      searchEmailStr: searchStr,
    });
  }

  handleEmailChange = e => {
    let dataList = this.state.users;

    const searchStr = e.target.value.trim();

    dataList = dataList.filter(item => {
      if (searchStr !== '') {
        if (
          !item.email ||
          item.email.toUpperCase().indexOf(searchStr.toUpperCase()) === -1
        ) {
          return false;
        }
      }
      return true;
    });

    this.setState({
      searchUsers: dataList,
      searchEmailStr: searchStr,
    });
  };

  render() {
    const { buffer } = this.state;
    return (
      <Paper className={this.props.classes.root}>
        <div style={{ width: 300, margin: '10px' }}>
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={this.state.users.map(option => option.email)}
            renderOption={(option, { selected }) => (
              <>
                <ListItemText
                  primary={option}
                  onClick={event => this.handleEmailClick({ option })}
                />
              </>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label='Search Email'
                margin='normal'
                variant='outlined'
                fullWidth
                InputProps={{ ...params.InputProps, type: 'search' }}
                onChange={this.handleEmailChange}
              />
            )}
          />
        </div>
        <div>
          <Popover
            open={this.state.buffer.length != 0}
            // anchorEl={this.state.anchorEl}
            onClose={() => this.handleClose()}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography style={{ margin: '20px' }}>
              {' '}
              {'List of events attended: '}{' '}
            </Typography>
            <Typography style={{ margin: '20px' }}>
              {' '}
              {buffer.length > 0
                ? buffer.map(number => <li>{number}</li>)
                : "Inductee hasn't attended any events"}
            </Typography>
          </Popover>
        </div>
        <div>
          <Table stickyHeader size='small' aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.searchUsers
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map(column => {
                        const value = row[column.id];
                        // if (column.id === "event_list")
                        // {
                        //    console.log(value)
                        // }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'officer_list' ? (
                              <ExpansionPanel>
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls='panel1a-content'
                                  id='panel1a-header'
                                >
                                  <Typography
                                    className={this.props.classes.heading}
                                  >
                                    Expand List of Officers
                                  </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                  <Typography>
                                    {value.length > 0
                                      ? value.map(number => <li>{number}</li>)
                                      : 'No Officer Check-offs available'}
                                  </Typography>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                            ) : column.id === 'event_list' ? (
                              <div>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  onClick={event =>
                                    this.handleRowClick(event, row)
                                  }
                                >
                                  See Events Details
                                </Button>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            component='div'
            count={this.state.searchUsers.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    );
  }
}

TotPoints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), withFirebase)(TotPoints);
