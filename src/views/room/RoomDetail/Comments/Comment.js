import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

const Comment = ({ comment }) => {
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
        <h5 style={{ margin: '0' }}>{comment.user}</h5>
        <p style={{ margin: '0', fontSize: '12px', color: 'grey' }}>
          {comment.date}
        </p>
        <p style={{ margin: '0', color: '#525252' }}>{comment.comment}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.any
};

export default Comment;
