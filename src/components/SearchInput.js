import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  SvgIcon,
  TextField,
  // makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ButtonGroupInput from './Forms/ButtonGroupInput';

// const useStyles = makeStyles(() => ({

// }));

const SearchInput = ({ options, onSearch }) => {
  // const classes = useStyles();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (type = '') => {
    onSearch(keyword, type);
  };

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon
                fontSize="small"
                color="action"
              >
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="ค้นหาผู้ป่วย"
        variant="outlined"
        style={{ marginRight: '5px' }}
      />
      <ButtonGroupInput
        options={options}
        onClick={handleSearch}
        styles={{ padding: '16px 14px' }}
      />
    </>
  );
};

SearchInput.propTypes = {
  options: PropTypes.array,
  onSearch: PropTypes.func,
};

export default SearchInput;
