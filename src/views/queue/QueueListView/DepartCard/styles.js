import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  departCard: {
    margin: '0 0 10px',
    padding: '10px'
  },
  departWrapper: {
    margin: '10px',
    padding: '10px',
    paddingBottom: '0px'
  },
  departName: {
    marginLeft: '10px',
    textDecoration: 'underline'
  }
}));
