import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import useStyles from './styles';

function SelectInput({ name, label, value, handleChange, options }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor="room-type" className={classes.selectLabel}>{label}</InputLabel>
      <Select
        labelId="room-type"
        className={classes.selectInput}
        variant="standard"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.id}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
