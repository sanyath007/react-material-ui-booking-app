import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  wrapper: {
    marginLeft: '8px',
    marginRight: '8px',
    padding: '5px',
  },
  formGroup: {
    flexDirection: 'column',
    border: '1px solid black'
  },
  fileInput: {
    width: '97%',
    margin: '10px',
  },
  imgWrapper: {
    height: '242px',
    overflow: 'hidden'
  },
  previewImg: {
    width: 'auto',
    height: '240px',
  }
}));
