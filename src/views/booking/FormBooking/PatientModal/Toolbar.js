import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ButtonGroupInput from '../../../../components/Forms/ButtonGroupInput';

const useStyles = makeStyles(() => ({

}));

const options = ['ค้นหาชื่อ-สกุล', 'ค้นหา HN', 'ค้นหา AN'];

const Toolbar = ({ className, handleSearch, ...rest }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');

  const onSearch = (type = '') => {
    let searchText = '';

    if (keyword !== '' && type === 0) {
      searchText = `fname:${keyword}`;
    } else if (keyword !== '' && type === 1) {
      searchText = `hn:${keyword}`;
    } else if (keyword !== '' && type === 2) {
      searchText = `an:${keyword}`;
    }

    handleSearch(searchText);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent className="pb-3">
            <Grid container>
              <Grid item md={6}>
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
                <ButtonGroupInput options={options} onClick={onSearch} styles={{ padding: '16px 14px' }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default Toolbar;
