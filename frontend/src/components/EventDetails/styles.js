const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(9),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleTag: {
    width: '300px',
    wordWrap: 'break-word',
    marginTop: '10px',
    marginRight: '100px',
    marginBottom: '10px',
  },
  hostLocTime: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
  },
  hosts: {
    width: '258px',
    wordWrap: 'break-word',
    marginRight: '10px',
  },
  hostName: {
    marginBottom: '5px',
  },
  locTime: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  descURL: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
  },
  desc: {
    marginLeft: '20px',
  },
  calendarButton: {
    marginTop: '25px',
  }
});

export default styles;