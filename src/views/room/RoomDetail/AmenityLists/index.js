import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  // makeStyles
} from '@material-ui/core';

const AmenityLists = ({ amenities }) => {
  console.log('====================================');
  console.log(amenities);
  console.log('====================================');
  return (
    <div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>bathtub</Icon>
        <span style={{ marginLeft: '10px' }}>ห้องน้ำ</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>shower</Icon>
        <span style={{ marginLeft: '10px' }}>เครื่องทำน้ำอุ่น</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>bed</Icon>
        <span style={{ marginLeft: '10px' }}>เตียงไฟฟ้า</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>tv</Icon>
        <span style={{ marginLeft: '10px' }}>โทรทัศน์</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>air</Icon>
        <span style={{ marginLeft: '10px' }}>เครื่องปรับอากาศ</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>kitchen</Icon>
        <span style={{ marginLeft: '10px' }}>ตู้เย็น</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>microwave</Icon>
        <span style={{ marginLeft: '10px' }}>ไมโครเวฟ</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>checkroom</Icon>
        <span style={{ marginLeft: '10px' }}>ตู้เสื้อผ้า</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>chair</Icon>
        <span style={{ marginLeft: '10px' }}>โซฟา</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>table_bar</Icon>
        <span style={{ marginLeft: '10px' }}>โต๊ะอาหาร</span>
      </div>
      <div style={{ paddingBottom: '16px' }}>
        <Icon>wifi</Icon>
        <span style={{ marginLeft: '10px' }}>Wifi</span>
      </div>
    </div>
  );
};

AmenityLists.propTypes = {
  amenities: PropTypes.array
};

export default AmenityLists;
