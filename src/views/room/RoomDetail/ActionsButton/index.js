import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import BlockIcon from '@material-ui/icons/Block';
import './style.css';

const ActionsButton = ({ room }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`action ${toggle ? 'active' : null}`}>
      <span onClick={() => setToggle(!toggle)}>
        <AddIcon />
      </span>
      <ul>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/app/rooms/edit/${room.room_id}`}>
            <BorderColorIcon className="btn-icon" />
            แก้ไข
          </Link>
        </li>
        <li>
          <a href="#">
            <DeleteIcon className="btn-icon" />
            ลบ
          </a>
        </li>
        <li>
          <a href="#">
            <WorkOffIcon className="btn-icon" />
            ปิดปรับปรุง
          </a>
        </li>
        <li>
          <a href="#">
            <BlockIcon className="btn-icon" />
            ยกเลิกการใช้
          </a>
        </li>
      </ul>
    </div>
  );
};

ActionsButton.propTypes = {
  room: PropTypes.any
};

export default ActionsButton;
