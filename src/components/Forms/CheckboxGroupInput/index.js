import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(3),
  },
}));

function CheckboxGroupInput({
  label,
  items,
  handleChange,
}) {
  const classes = useStyles();
  console.log(items);

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row>
        {items.map((item) => (
          <FormControlLabel
            control={
              (
                <Checkbox
                  name={item.id}
                  onChange={handleChange}
                  checked={item.checked}
                />
              )
            }
            key={item.id}
            label={item.name}
          />
        ))}
      </FormGroup>
      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
}

CheckboxGroupInput.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  handleChange: PropTypes.func,
};

export default CheckboxGroupInput;
