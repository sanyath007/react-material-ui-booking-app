import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    // marginRight: theme.spacing(1)
  },
  editBtn: {
    color: theme.palette.warning.contrastText,
    background: theme.palette.warning.main,
    '&:hover': {
      background: theme.palette.warning.light
    }
  },
  deleteBtn: {
    color: theme.palette.error.contrastText,
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.light
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
