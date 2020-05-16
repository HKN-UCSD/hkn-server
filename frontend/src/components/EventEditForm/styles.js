const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomPanel: {
    width: '80%',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '50px',
  },
  dateField: {
    margin: '15px',
    width: '40%',
  },
  field: {
    margin: '15px',
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  urls: {
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  controls: {
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
});

export default styles;
