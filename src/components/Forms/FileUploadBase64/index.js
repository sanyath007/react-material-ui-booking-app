import React from 'react';
// import PropTypes from 'prop-types';
import FileBase from 'react-file-base64';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  fileInput: {
    width: '97%',
    margin: '10px 0',
  }
}));

function FileUploadBase64() {
  const classes = useStyles();

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div className={classes.fileInput}>
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => onChange(base64)}
      />
    </div>
  );
}

// FileUploadBase64.propTypes = {
//   handleChange: PropTypes.func
// };

export default FileUploadBase64;
