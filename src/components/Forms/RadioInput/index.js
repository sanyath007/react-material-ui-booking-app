import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';

function RadioInput({
  name,
  label,
  value,
  handleChange,
  items
}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <FormControlLabel key={index} value={item.id} label={item.name} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  items: PropTypes.array,
};

export default RadioInput;
