import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RestoreIcon from '@material-ui/icons/Restore';

const roomStatuses = [
  { id: 0, name: 'ว่าง' },
  { id: 1, name: 'ใช้งานอยู่' },
  { id: 2, name: 'ปิดปรับปรุง' },
  { id: 3, name: 'งดใช้ชั่วคราว' },
  { id: 9, name: 'ยกเลิกการใช้' }
];

const SubTitle = ({ roomStatus }) => {
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

        <span style={{ marginLeft: '10px' }}>
          <RestoreIcon color="action" fontSize="small" />
          <span>
            {roomStatuses.find((rs) => rs.id === parseInt(roomStatus, 10))?.name}
          </span>
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

SubTitle.propTypes = {
  roomStatus: PropTypes.number
};

export default SubTitle;
