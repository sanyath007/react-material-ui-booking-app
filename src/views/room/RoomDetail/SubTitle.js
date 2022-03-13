import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const SubTitle = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '5px' }}>
          <StarIcon color="secondary" fontSize="small" />
          4.8
        </span>
        ·
        <span style={{ marginLeft: '5px' }}>
          <a href="">61 reviews</a>
        </span>
      </div>
      <div style={{ width: '30%', textAlign: 'right' }}>
        <span style={{ marginRight: '10px' }}>
          <ShareIcon color="action" fontSize="small" />
          <a href="">Share</a>
        </span>
        <span>
          <FavoriteBorderIcon color="action" fontSize="small" />
          <a href="">Like</a>
        </span>
      </div>
    </div>
  );
};

export default SubTitle;
