import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid } from '@material-ui/core';

const Comments = ({ comments }) => {
  return (
    <Grid
      container
      style={{ marginTop: '20px' }}
    >
      {comments && comments.map((comment) => {
        return (
          <Grid item xs={12} md={6} key={comment.id}>
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
                <p style={{ margin: '0', fontSize: '12px' }}>{comment.date}</p>
                <p style={{ margin: '0' }}>{comment.comment}</p>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array
};

export default Comments;
