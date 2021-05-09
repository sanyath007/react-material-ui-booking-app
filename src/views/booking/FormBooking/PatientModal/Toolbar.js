import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles
} from '@material-ui/core';
import SearchInput from 'src/components/SearchInput';

const useStyles = makeStyles(() => ({

}));

const options = ['ค้นหาชื่อ-สกุล', 'ค้นหา HN', 'ค้นหา AN'];

const Toolbar = ({ className, handleSearch, ...rest }) => {
  const classes = useStyles();

  const onSearch = (keyword, type = '') => {
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

                <SearchInput options={options} onSearch={onSearch} />

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
