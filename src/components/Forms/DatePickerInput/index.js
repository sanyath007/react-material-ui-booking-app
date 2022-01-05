import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';

const DatePickerInput = ({
  name,
  label,
  value,
  format,
  onChange,
  error,
  helperText,
  readOnly
}) => {
  const convertToDefEventParams = (target, date) => ({ target: { name: target, value: date } });

  return (
    <DatePicker
      autoOk
      fullWidth
      disableToolbar
      variant="inline"
      label={label}
      format={format || 'DD/MM/yyyy'}
      value={value}
      onChange={(date) => onChange(convertToDefEventParams(name, date))}
      error={error}
      helperText={helperText}
      readOnly={readOnly}
      style={{ paddingRight: '16px' }}
    />
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  format: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.any,
  readOnly: PropTypes.bool,
};

export default DatePickerInput;
