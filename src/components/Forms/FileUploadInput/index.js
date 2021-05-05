import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Form as BsForm } from 'react-bootstrap';
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
    >
      <Grid item xs={12} style={{ padding: '5px 0px' }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <label htmlFor={name} style={{ marginRight: '5px' }}>
            {`${label} :`}
          </label>
          <BsForm.File
            type="file"
            name={name}
            onChange={(e) => handleImageChange(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.imgWrapper}>
        {defaultImg
          ? <img src={defaultImg} alt={name} className={classes.previewImg} />
          : image && <img src={image} alt={name} className={classes.previewImg} />}
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
