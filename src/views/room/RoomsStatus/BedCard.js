import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent } from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { bookingActions } from '../../../redux';

const BedCard = ({ room, used }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  const handleDischargeClick = (bookId, roomId) => {
    if (window.confirm('คุณต้องการจำหน่ายผู้ป่วย ใช่หรือไม่?')) {
      dispatch(bookingActions.checkout(bookId, roomId));
    }
  };

  const handleCancelCheckinClick = (bookId, roomId) => {
    if (window.confirm('คุณต้องการยกเลิกการรับผู้ป่วยเข้าห้อง ใช่หรือไม่?')) {
      dispatch(bookingActions.cancelCheckin(bookId, roomId));
    }
  };

  return (
    <Card>
      {/* // TODO: styling CardContent */}
      <CardContent style={{ height: '200px', fontSize: '14px' }}>
        <h5>{room.room_name}</h5>

        {used ? (
          <Alert variant="danger" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '80px' }}>
              <p style={{ margin: '0' }}>
                {`AN : ${used.booking_room?.booking?.ip?.an} HN: ${used.booking_room?.booking?.ip?.hn}`}
              </p>
              <p style={{ margin: '0' }}>
                {`ผู้ป่วย : ${used.booking_room?.booking?.ip?.patient?.pname}${used.booking_room?.booking?.ip?.patient?.fname} ${used.booking_room?.booking?.ip?.patient?.lname}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ Admit : ${moment(used.booking_room?.booking?.ip?.regdate).format('DD/MM/YYYY')}`}
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
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleDischargeClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
              endIcon={<MeetingRoomIcon fontSize="small" />}
            >
              D/C
            </Button>

            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => {
                handleCancelCheckinClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
              className="float-right"
              endIcon={<EventBusyIcon fontSize="small" />}
            >
              ยกเลิก
            </Button>
          </>
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
