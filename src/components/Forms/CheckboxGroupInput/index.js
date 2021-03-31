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
  // itemsDirection
}) {
  const classes = useStyles();
  // TODO: iterate item with id and name

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row>
        {items.map((item) => (
          <FormControlLabel
            control={
              (
                <Checkbox
                  name={item.room_type_id}
                  onChange={handleChange}
                />
              )
            }
            key={item.room_type_id}
            label={item.room_type_name}
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
  // itemsDirection: PropTypes.string
};

export default CheckboxGroupInput;
