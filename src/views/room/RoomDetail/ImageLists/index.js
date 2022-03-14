import React from 'react';
import PropTypes from 'prop-types';
import ShowAllButton from './ShowAllButton';

const ImageLists = ({ room }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '360px',
        overflow: 'hidden',
        borderRadius: '10px'
      }}
    >
      <div style={{ width: '50%' }}>
        <img
          src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
          alt=""
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '25%',
          padding: '0 10px',
        }}
      >
        <img
          src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
          alt=""
          style={{
            width: '100%',
            height: '50%',
          }}
        />
        <img
          src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
          alt=""
          style={{
            width: '100%',
            height: '50%',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '25%'
        }}
      >
        <img
          src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
          alt=""
          style={{
            width: '100%',
            height: '50%',
          }}
        />
        <img
          src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
          alt=""
          style={{
            width: '100%',
            height: '50%',
          }}
        />
      </div>

      <ShowAllButton />
    </div>
  );
};

ImageLists.propTypes = {
  room: PropTypes.any
};

export default ImageLists;
