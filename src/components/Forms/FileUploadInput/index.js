import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import useStyles from './styles';

function FileUploadInput({ name, label, handleChange }) {
  const [image, setImage] = useState('');
  const classes = useStyles();

  const convertToDefEventParams = (target, value) => ({ target: { name: target, value } });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;

      setImage(base64String);

      handleChange(convertToDefEventParams(name, base64String));
    };

    reader.readAsDataURL(file);
  };

  return (
    <Grid
      container
      className={classes.wrapper}
      direction="row"
      justify="flex-end"
    >
      <Grid item xs={12} sm={12} md={6}>
        <Form.Group>
          <Form.File
            type="file"
            name={name}
            onChange={(e) => handleImageChange(e)}
            label={label}
          />
        </Form.Group>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={classes.imgWrapper}>
        <img src={image} alt={name} className={classes.previewImg} />
      </Grid>
    </Grid>
  );
}

FileUploadInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func
};

export default FileUploadInput;
