import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button as MuiButton,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
      style={{ marginBottom: '20px' }}
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
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
