import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import useStyles from './styles';
import fileReader from '../../../utils/fileReader';

function FileUploadInput({
  name,
  label,
  defaultImg,
  handleChange
}) {
  const [image, setImage] = useState('');
  const classes = useStyles();

  const convertToDefEventParams = (target, value) => ({ target: { name: target, value } });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const base64String = await fileReader.readFileAsync(file);

    setImage(base64String);

    handleChange(convertToDefEventParams(name, base64String));
  };

  return (
    <Grid
      container
      className={classes.wrapper}
      direction="column"
      justify="flex-end"
      style={{ border: '1px solid blue' }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{ border: '1px solid red' }}
      >
        <Form.Group>
          <Form.File
            type="file"
            name={name}
            onChange={(e) => handleImageChange(e)}
            label={label}
          />
        </Form.Group>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        mx="auto"
        className={classes.imgWrapper}
        style={{ border: '1px solid black' }}
      >
        {defaultImg
          ? <img src={defaultImg} alt={name} className={classes.previewImg} />
          : <img src={image} alt={name} className={classes.previewImg} />}
      </Grid>
    </Grid>
  );
}

FileUploadInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultImg: PropTypes.string,
  handleChange: PropTypes.func
};

export default FileUploadInput;
