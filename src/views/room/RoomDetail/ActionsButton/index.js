import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import BlockIcon from '@material-ui/icons/Block';
import BuildIcon from '@material-ui/icons/Build';
import { roomActions } from '../../../../redux';
import './style.css';

const ActionsButton = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleUpdateStatus = (status) => (event) => {
    event.preventDefault();
    console.log(status, event);
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการเปลี่ยนสถานะห้องพิเศษเลขที่ ${room.room_no} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(roomActions.updateStatus(room.room_id, status, navigate));
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการลบห้องพิเศษรหัส ${room.room_id} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(roomActions.destroy(room.room_id));
      }
    });
  };

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
          <a href="#" onClick={handleDelete}>
            <DeleteIcon className="btn-icon" />
            ลบ
          </a>
        </li>
        <li>
          <a href="#" onClick={handleUpdateStatus(2)}>
            <BuildIcon className="btn-icon" />
            ปิดปรับปรุง
          </a>
        </li>
        <li>
          <a href="#" onClick={handleUpdateStatus(3)}>
            <WorkOffIcon className="btn-icon" />
            งดใช้ชั่วคราว
          </a>
        </li>
        <li>
          <a href="#" onClick={handleUpdateStatus(9)}>
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
