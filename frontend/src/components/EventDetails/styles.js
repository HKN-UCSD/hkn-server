const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  card: {
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '25px',
  },
  calendarButton: {
    marginTop: '25px',
  }
});

export default styles;