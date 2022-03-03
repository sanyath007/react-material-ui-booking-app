import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { ErrorMessage } from 'formik';
import useStyles from './styles';

function SelectInput({
  name,
  label,
  value,
  error,
  options,
  handleChange
}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel
        htmlFor={label}
        className={classes.selectLabel}
        error={error}
      >
        {label}
      </InputLabel>
      <Select
        labelId={label}
        className={classes.selectInput}
        variant="standard"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options && options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>
        <ErrorMessage name={name} />
      </FormHelperText>
    </FormControl>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.bool,
  options: PropTypes.array,
  handleChange: PropTypes.func,
};

export default SelectInput;
