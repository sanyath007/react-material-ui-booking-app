import React from 'react';
import PropTypes from 'prop-types';
import { Badge, makeStyles } from '@material-ui/core';
import SingleBedIcon from '@material-ui/icons/SingleBed';

const useStyles = makeStyles(() => ({
  root: {},
  floorTitle: {
    display: 'flex', justifyContent: 'space-between'
  },
  floorName: {
    marginLeft: '10px',
    textDecoration: 'underline'
  },
  floorRooms: {
    display: 'flex', paddingRight: '15px'
  }
}));

const FloorTitle = ({ title, empty, total }) => {
  const classes = useStyles();

  return (
    <div className={classes.floorTitle}>
      <h3 className={classes.floorName}>
        {title}
      </h3>
      <div className={classes.floorRooms}>
        <Badge badgeContent={empty} color="secondary" style={{ marginRight: '15px' }}>
          <SingleBedIcon />
        </Badge>
        |
        <span className="ml-2">
          {`ทั้งหมด ${total} ห้อง`}
        </span>
      </div>
    </div>
  );
};

FloorTitle.propTypes = {
  title: PropTypes.string,
  empty: PropTypes.number,
  total: PropTypes.number
};

export default FloorTitle;
