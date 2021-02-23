import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

function CheckboxInput({
  name,
  label,
  value,
  handleChange
}) {
  const convertToDefEventParams = (target, value) => ({ target: { name: target, value } });

  return (
    <FormControl>
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
    </FormControl>
  );
}

CheckboxInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func
};

export default CheckboxInput;
