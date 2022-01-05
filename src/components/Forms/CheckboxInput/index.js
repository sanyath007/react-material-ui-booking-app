import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel
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
      style={{ padding: '0px 6px' }}
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
