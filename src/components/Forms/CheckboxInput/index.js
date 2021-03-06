import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

function CheckboxInput({
  name,
  label,
  value,
  handleChange
}) {
  const convertToDefEventParams = (target, val) => ({
    target: { name: target, value: val }
  });

  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          name={name}
          color="primary"
          checked={value}
          onChange={(e) => handleChange(convertToDefEventParams(name, e.target.checked))}
        />
      )}
    />
  );
}

CheckboxInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func
};

export default CheckboxInput;
