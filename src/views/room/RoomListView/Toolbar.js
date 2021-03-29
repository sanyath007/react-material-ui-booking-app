import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const floors = [
  { id: 1, name: 'ชั้น 1' },
  { id: 2, name: 'ชั้น 2' },
  { id: 3, name: 'ชั้น 3' }
];

const Toolbar = ({ className, showFilteredRoom, ...rest }) => {
  const classes = useStyles();
  const [selectedFloor, setSelectedFloor] = useState('');

  const handleFilterRoom = (floor) => {
    showFilteredRoom(floor);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/app/newroom"
        >
          เพิ่มห้อง
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="floor">ชั้น</InputLabel>
                  <Select
                    labelId="floor"
                    variant="standard"
                    name="selectedFloor"
                    value={selectedFloor}
                    onChange={(e) => {
                      setSelectedFloor(e.target.value);
                      handleFilterRoom(e.target.value);
                    }}
                  >
                    {floors.map((floor) => (
                      <MenuItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <TextField
                  fullWidth
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
                  placeholder="Search Room Name"
                  variant="outlined"
                />
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
  showFilteredRoom: PropTypes.func,
};

export default Toolbar;
