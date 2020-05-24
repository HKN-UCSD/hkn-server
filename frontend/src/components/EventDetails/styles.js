const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(9),
  },
  container: {
    backgroundColor: 'white',
  },
  titleTag: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  hostLocTime: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  hosts: {
    wordWrap: 'break-word',
    marginRight: '10px',
  },
  hostName: {
    marginBottom: '5px',
  },
  locTime: {
    marginLeft: '10px',
  },
  descURL: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  desc: {
    marginLeft: '20px',
  },
  calendarButton: {
    marginTop: '25px',
  },
});

export default styles;
