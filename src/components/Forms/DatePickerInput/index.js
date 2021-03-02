import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';

const DatePickerInput = ({
  name,
  label,
  value,
  format,
  onChange
}) => {
  const convertToDefEventParams = (target, date) => ({ target: { name: target, value: date } });

  return (
    <DatePicker
      autoOk
      disableToolbar
      variant="inline"
      label={label}
      format={format || 'DD/MM/yyyy'}
      value={value}
      onChange={(date) => onChange(convertToDefEventParams(name, date))}
      fullWidth
    />
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  format: PropTypes.string,
  onChange: PropTypes.func,
};

export default DatePickerInput;
