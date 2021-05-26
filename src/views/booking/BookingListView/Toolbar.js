import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button as MuiButton,
  Card,
  CardContent,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchInput from '../../../components/SearchInput';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
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
      <Box display="flex" justifyContent="flex-end">
        <MuiButton className={classes.importButton}>
          Import
        </MuiButton>
        <MuiButton className={classes.exportButton}>
          Export
        </MuiButton>
        <MuiButton
          color="primary"
          variant="contained"
          component={Link}
          to="/app/bookings/new"
        >
          ลงทะเบียนจองห้อง
        </MuiButton>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={12} md={8} lg={6}>

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
