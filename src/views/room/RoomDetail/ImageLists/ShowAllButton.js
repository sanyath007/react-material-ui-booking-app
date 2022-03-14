import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';

const ShowAllButton = () => {
  return (
    <div
      style={{
        position: 'relative',
        bottom: '5px',
        right: '5px',
        zIndex: '10',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          display: 'flex',
          padding: '5px',
          width: '120px',
          border: '1px solid #525252',
          borderRadius: '5px',
          backgroundColor: 'white',
          opacity: '0.8'
        }}
      >
        <AppsIcon color="action" />
        <a href="#">
          ดูรูปทั้งหมด
        </a>
      </div>
    </div>
  );
};

export default ShowAllButton;
