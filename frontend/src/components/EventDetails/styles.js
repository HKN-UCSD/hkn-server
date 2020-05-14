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
    marginBottom: '25px',
    backgroundColor: 'white',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  hostLocTime: {
    display: 'flex',
    flexDirection: 'row',
  },
  host: {
    marginRight: '20px',
  },
  locTime: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
  },
  titleTag: {
    width: '300px',
    wordWrap: 'break-word',
    marginTop: '10px',
    marginRight: '100px',
    marginBottom: '10px',
  },
  hostName: {
    textIndent: '10px'
  },
  calendarButton: {
    marginTop: '25px',
  }
});

export default styles;