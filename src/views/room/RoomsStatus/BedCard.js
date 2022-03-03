import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent } from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import CachedIcon from '@material-ui/icons/Cached';
import { bookingActions } from '../../../redux';
import MovingRoomModal from './MovingRoomModal';

const BedCard = ({ room, used }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [moved, setMoved] = useState(null);

  const handleCheckoutClick = (bookId, roomId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'คุณต้องการจำหน่ายผู้ป่วย ใช่หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookingActions.checkout({ bookId, roomId, user: auth.username }));
      }
    });
  };

  const handleMoveClick = (booking) => {
    setMoved(booking);
    setOpenModal(true);
  };

  const handleCancelCheckinClick = (bookId, roomId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'คุณต้องการยกเลิกการรับผู้ป่วยเข้าห้อง ใช่หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookingActions.cancelCheckin({ bookId, roomId, user: auth.username }));
      }
    });
  };

  return (
    <Card>
      <CardContent style={{ height: '200px', fontSize: '14px' }}>
        <h5>{room.room_name}</h5>

        <MovingRoomModal
          isOpen={openModal}
          onHide={() => setOpenModal(false)}
          booking={moved}
        />

        {used ? (
          <Alert variant="danger" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '80px' }}>
              <p style={{ margin: '0' }}>
                {`AN : ${used.booking_room?.booking?.patient.admit?.an} HN: ${used.booking_room?.booking?.patient?.hn}`}
              </p>
              <p style={{ margin: '0' }}>
                {`ผู้ป่วย : ${used.booking_room?.booking?.patient?.pname}${used.booking_room?.booking?.patient?.fname} ${used.booking_room?.booking?.patient?.lname}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ Admit : ${moment(used.booking_room?.booking?.patient.admit?.regdate).format('DD/MM/YYYY')}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ย้ายเข้า : ${moment(used.booking_room?.checkin_date).format('DD/MM/YYYY')} ${used.booking_room?.checkin_time}`}
              </p>
            </div>
          </Alert>
        ) : (
          <Alert variant="success" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '80px' }}>
              ห้องว่าง
            </div>
          </Alert>
        )}

        {[1, 2].includes(parseInt(auth.role, 10)) && used && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleCheckoutClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
              endIcon={<ExitToAppIcon fontSize="small" />}
            >
              D/C
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                handleMoveClick(used);
              }}
              endIcon={<CachedIcon fontSize="small" />}
            >
              ย้ายห้อง
            </Button>

            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => {
                handleCancelCheckinClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
              className="float-right"
              endIcon={<CancelIcon fontSize="small" />}
            >
              ยกเลิก
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

BedCard.propTypes = {
  room: PropTypes.object.isRequired,
  used: PropTypes.object,
};

export default BedCard;
