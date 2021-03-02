import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const TimePickerInput = ({
  name,
  label,
  value,
  onChange
}) => {
  return (
    <TextField
      variant="standard"
      type="time"
      fullWidth
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
  );
};

TimePickerInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TimePickerInput;
