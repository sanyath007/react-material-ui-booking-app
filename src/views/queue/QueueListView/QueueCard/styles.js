import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  queueCard: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  queueNo: {
    marginBottom: '10px',
    background: '#dddddd',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: 'auto auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkinButton: {
    marginRight: theme.spacing(1)
  },
  textVal: {
    marginLeft: '2px',
    fontWeight: 'bold'
  },
}));
