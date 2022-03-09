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

const Toolbar = ({
  handleSearch,
  handleIpOnlyChecked,
  isIpOnly,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const onSearch = (keyword, type = '') => {
    let searchText = '';

    if (keyword !== '' && type === 0) {
      const [fname, lname = ''] = keyword.split(' ');

      searchText = `name:${fname},${lname}`;
    } else if (keyword !== '' && type === 1) {
      searchText = `hn:${keyword}`;
    } else if (keyword !== '' && type === 2) {
      searchText = `an:${keyword}`;
    }

    handleSearch(searchText);
  };

  const handleChecked = (e) => {
    handleIpOnlyChecked(e.target.checked);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={1}>
        <Card>
          <CardContent className="pb-3">
            <Grid container>
              <Grid item sm={12} md={12} lg={12}>

                <SearchInput options={options} onSearch={onSearch} />

                <input
                  type="checkbox"
                  className="ml-3 mr-2"
                  sx={{ my: 'auto' }}
                  value={isIpOnly}
                  checked={isIpOnly}
                  onChange={handleChecked}
                />
                <span>เลือกเฉพาะผู้ป่วยใน</span>

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
  handleIpOnlyChecked: PropTypes.func,
  isIpOnly: PropTypes.bool,
};

export default Toolbar;
