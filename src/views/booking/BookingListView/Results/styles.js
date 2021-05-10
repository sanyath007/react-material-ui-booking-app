import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  viewBtn: {
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  editBtn: {
    color: theme.palette.warning.dark,
    '&:hover': {
      color: theme.palette.warning.main
    }
  },
  delBtn: {
    color: theme.palette.error.dark,
    '&:hover': {
      color: theme.palette.error.main
    }
  },
  dchBtn: {
    color: '#525252',
    '&:hover': {
      color: '#716e77'
    }
  },
  checkinBtn: {
    color: theme.palette.success.dark,
    '&:hover': {
      color: theme.palette.success.main
    }
  }
}));
