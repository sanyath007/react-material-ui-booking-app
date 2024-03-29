import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import CachedIcon from '@material-ui/icons/Cached';
import PopperIcon from 'src/components/PopperIcon';
import { bookingActions } from '../../../redux';
import MovingRoomModal from './MovingRoomModal';

const BedCard = ({ room, checkedIn }) => {
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
      <CardContent style={{ minHeight: '220px', fontSize: '14px' }}>
        <Link to={`../rooms/detail/${room.room_id}`}>
          <h5>
            {room.room_name}
            <span style={{ marginLeft: '5px', fontSize: '16px' }}>
              {`(${room.room_type.room_type_name})`}
            </span>
          </h5>
        </Link>

        <MovingRoomModal
          isOpen={openModal}
          hideModal={() => setOpenModal(false)}
          checkedIn={moved}
        />

        {checkedIn ? (
          <Alert variant="danger" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ minHeight: '80px' }}>
              <div style={{ margin: '0' }}>
                {
                  checkedIn?.booking?.patient.admit
                    ? (
                      <span style={{ marginRight: '5px' }}>
                        {`AN : ${checkedIn?.booking?.patient.admit?.an}`}
                      </span>
                    ) : (
                      <span className="badge badge-danger" style={{ padding: '5px', marginRight: '5px' }}>
                        (ผู้ป่วย D/C แล้ว)
                      </span>
                    )
                }
                <span>{`HN: ${checkedIn?.booking?.patient?.hn}`}</span>
              </div>
              <div style={{ margin: '0', display: 'flex', alignItems: 'center' }}>
                {`ผู้ป่วย : ${checkedIn?.booking?.patient?.pname}${checkedIn?.booking?.patient?.fname} ${checkedIn?.booking?.patient?.lname}`}
                {checkedIn.booking?.in_labour === '1'
                  ? <PopperIcon icon="child_friendly" iconColor="primary" />
                  : null}
                {checkedIn.booking?.newborns.length > 0
                  ? <PopperIcon icon="child_care" iconColor="secondary" />
                  : null}
              </div>
              <p style={{ margin: '0' }}>
                {
                  checkedIn?.booking?.patient.admit
                    ? `วันที่ Admit : ${moment(checkedIn?.booking?.patient.admit?.regdate).format('DD/MM/YYYY')}`
                    : 'วันที่ Admit : - '
                }
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ย้ายเข้า : ${moment(checkedIn?.checkin_date).format('DD/MM/YYYY')} ${checkedIn?.checkin_time}`}
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

        {[1, 2].includes(parseInt(auth.role, 10)) && checkedIn && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleCheckoutClick(checkedIn.book_id, checkedIn.room_id);
              }}
              endIcon={<ExitToAppIcon fontSize="small" />}
            >
              D/C
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                handleMoveClick(checkedIn);
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
                handleCancelCheckinClick(checkedIn.book_id, checkedIn.room_id);
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
  checkedIn: PropTypes.object,
};

export default BedCard;
