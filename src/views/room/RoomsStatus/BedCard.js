import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { bookingActions } from '../../../redux';

const BedCard = ({ room, used }) => {
  const dispatch = useDispatch();

  const handleDischargeClick = (bookId, roomId) => {
    if (window.confirm('คุณต้องการจำหน่ายผู้ป่วย ใช่หรือไม่?')) {
      dispatch(bookingActions.checkout(bookId, roomId));
    }
  };

  const handleCancelCheckinClick = (bookId, roomId) => {
    if (window.confirm('คุณต้องการยกเลิกการรับผู้ป่วยเข้าห้อง ใช่หรือไม่?')) {
      dispatch(bookingActions.checkout(bookId, roomId));
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
                {`AN : ${used.booking_room?.booking?.an?.an} HN: ${used.booking_room?.booking?.an?.hn}`}
              </p>
              <p style={{ margin: '0' }}>
                {`ผู้ป่วย : ${used.booking_room?.booking?.an?.patient?.pname}${used.booking_room?.booking?.an?.patient?.fname} ${used.booking_room?.booking?.an?.patient?.lname}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ Admit : ${moment(used.booking_room?.booking?.an?.regdate).format('DD/MM/YYYY')}`}
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

        {used && (
          <>
            <Button
              size="sm"
              variant="primary"
              style={{ margin: '0' }}
              onClick={() => {
                handleDischargeClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
            >
              D/C
              <MeetingRoomIcon fontSize="small" />
            </Button>

            <Button
              size="sm"
              variant="danger"
              style={{ margin: '0' }}
              onClick={() => {
                handleCancelCheckinClick(used.booking_room.book_id, used.booking_room.room_id);
              }}
              className="float-right"
            >
              ยกเลิก
              <EventBusyIcon fontSize="small" />
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
