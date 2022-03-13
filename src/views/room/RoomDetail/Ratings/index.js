import React from 'react';
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

const Ratings = () => {
  const classes = useStyles();

  return (
    <div className={classes.ratings}>
      <div className={classes.ratingItem}>
        <span>Cleanliness</span>
        <Rating name="size-small" defaultValue={4} size="small" />
      </div>
      <div className={classes.ratingItem}>
        Accuracy
        <Rating name="size-small" defaultValue={2} size="small" />
      </div>
      <div className={classes.ratingItem}>
        Location
        <Rating name="size-small" defaultValue={3} size="small" />
      </div>
      <div className={classes.ratingItem}>
        Communication
        <Rating name="size-small" defaultValue={5} size="small" />
      </div>
    </div>
  );
};

export default Ratings;
