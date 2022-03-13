import React from 'react';
import { Avatar } from '@material-ui/core';

const Comments = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <div style={{ marginLeft: '10px' }}>
        <h5 style={{ margin: '0' }}>Kobe Jr</h5>
        <p style={{ margin: '0', fontSize: '12px' }}>12/03/2020</p>
        <p style={{ margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default Comments;
