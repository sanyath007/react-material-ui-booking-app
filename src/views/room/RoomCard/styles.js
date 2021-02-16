import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
