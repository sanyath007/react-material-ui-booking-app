import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button as MuiButton,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import ButtonGroupInput from '../../../components/Forms/ButtonGroupInput';

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
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    handleSearch(keyword);
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
          เพิ่มการจองห้อง
        </MuiButton>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
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
