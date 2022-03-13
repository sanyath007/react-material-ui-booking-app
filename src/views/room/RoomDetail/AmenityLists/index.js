import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Icon,
  // makeStyles
} from '@material-ui/core';

const AmenityLists = ({ amenities }) => {
  console.log(amenities);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <Icon>bathtub</Icon>
        <span style={{ marginLeft: '10px' }}>ห้องน้ำ</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>shower</Icon>
        <span style={{ marginLeft: '10px' }}>เครื่องทำน้ำอุ่น</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>bed</Icon>
        <span style={{ marginLeft: '10px' }}>เตียงไฟฟ้า</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>tv</Icon>
        <span style={{ marginLeft: '10px' }}>โทรทัศน์</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>air</Icon>
        <span style={{ marginLeft: '10px' }}>เครื่องปรับอากาศ</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>kitchen</Icon>
        <span style={{ marginLeft: '10px' }}>ตู้เย็น</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>microwave</Icon>
        <span style={{ marginLeft: '10px' }}>ไมโครเวฟ</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>checkroom</Icon>
        <span style={{ marginLeft: '10px' }}>ตู้เสื้อผ้า</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>chair</Icon>
        <span style={{ marginLeft: '10px' }}>โซฟา</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>table_bar</Icon>
        <span style={{ marginLeft: '10px' }}>โต๊ะอาหาร</span>
      </Grid>
      <Grid item xs={6} md={3}>
        <Icon>wifi</Icon>
        <span style={{ marginLeft: '10px' }}>Wifi</span>
      </Grid>
    </Grid>
  );
};

AmenityLists.propTypes = {
  amenities: PropTypes.array
};

export default AmenityLists;
