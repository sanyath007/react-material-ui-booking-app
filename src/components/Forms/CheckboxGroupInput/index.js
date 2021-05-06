import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import { ErrorMessage } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
  },
}));

function CheckboxGroupInput({
  name,
  label,
  items,
  error,
  itemsDirection,
  handleChange
}) {
  const classes = useStyles();
  const [group, setGroup] = useState([]);

  // Set group of checkbox and return array
  const setCheckboxGroupChecked = (id) => {
    const index = group.indexOf(id);

    let newGroup = [];
    if (index === -1) {
      newGroup = newGroup.concat(group, id);
    } else {
      newGroup = newGroup.concat(
        group.splice(0, index),
        group.splice(index + 1)
      );
    }

    setGroup(newGroup);
    handleChange(newGroup);
  };

  const onChecked = (e) => {
    const checkedItem = items.find((item) => item.id === e.target.name);

    checkedItem.checked = e.target.checked;

    setCheckboxGroupChecked(e.target.name);
  };

  useEffect(() => {
    const initGroup = items.filter((item) => item.checked).map((item) => item.id);

    setGroup(initGroup);
  }, [items]);

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup aria-label="position" row={itemsDirection === 'row'}>
        {items.map((item) => (
          <FormControlLabel
            control={
              (
                <Checkbox
                  name={item.id}
                  onChange={onChecked}
                  checked={item.checked}
                />
              )
            }
            key={item.id}
            label={item.name}
          />
        ))}
      </FormGroup>

      <FormHelperText error={error}><ErrorMessage name={name} /></FormHelperText>
    </FormControl>
  );
}

CheckboxGroupInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  error: PropTypes.bool,
  itemsDirection: PropTypes.string,
  handleChange: PropTypes.func
};

export default CheckboxGroupInput;
