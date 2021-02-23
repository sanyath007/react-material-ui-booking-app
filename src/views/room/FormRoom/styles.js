import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  formControl: {
    padding: theme.spacing(1)
  },
  selectInput: {
    // margin: theme.spacing(1)
  },
  selectLabel: {
    marginLeft: theme.spacing(1)
  },
  buttonSubmit: {
    margin: theme.spacing(1),
    marginBottom: 10
  }
}));
