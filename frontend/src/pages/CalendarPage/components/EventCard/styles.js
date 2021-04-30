const styles = theme => ({
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: `${theme.spacing(1)}px`,
    margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto 10%',
  },
  modalDiv: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export default styles;
