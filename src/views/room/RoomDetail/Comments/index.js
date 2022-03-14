import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Comment from './Comment';

const Comments = ({ comments }) => {
  return (
    <Grid
      container
      style={{ marginTop: '20px' }}
    >
      {comments && comments.map((comment) => {
        return (
          <Grid item xs={12} md={6} key={comment.id}>
            <Comment comment={comment} />
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
