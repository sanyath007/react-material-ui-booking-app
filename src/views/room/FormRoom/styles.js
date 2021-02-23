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
    // margin: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  checkboxGroup: {
    marginLeft: '8px',
    padding: '0px',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  buttonSubmit: {
    margin: theme.spacing(1),
    marginBottom: 10
  }
}));
