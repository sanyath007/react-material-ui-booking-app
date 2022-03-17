import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {},
  ratings: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 20px',
  },
  ratingItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Ratings = ({ ratings }) => {
  const classes = useStyles();

  return (
    <div className={classes.ratings}>
      {ratings && ratings.map((rating) => (
        <div className={classes.ratingItem}>
          <span>{rating.name}</span>
          <Rating name="size-small" defaultValue={rating.value} size="small" />
        </div>
      ))}
    </div>
  );
};

Ratings.propTypes = {
  ratings: PropTypes.array
};

export default Ratings;
