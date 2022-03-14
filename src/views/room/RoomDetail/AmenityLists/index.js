import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Icon,
  // makeStyles
} from '@material-ui/core';

const AmenityLists = ({ amenities }) => {
  return (
    <Grid container spacing={2}>
      {amenities && amenities.map((room) => {
        const { amenity } = room;

        return (
          <Grid item xs={6} md={3} key={amenity[0].amenity_id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon>{amenity[0].amenity_icon}</Icon>
              <span style={{ marginLeft: '10px' }}>
                {amenity[0].amenity_desc}
              </span>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

AmenityLists.propTypes = {
  amenities: PropTypes.array
};

export default AmenityLists;
