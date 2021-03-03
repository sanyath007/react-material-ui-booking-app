import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import Page from 'src/components/Page';
// import BedCard from './BedCard';
import api from '../../../api';
import useStyles from './styles';

const RoomsStatus = () => {
  const classes = useStyles();
  const [rooms1, setRooms1] = useState([]);
  const [rooms2, setRooms2] = useState([]);
  const [rooms3, setRooms3] = useState([]);
  const [status, setStatus] = useState([]);

  const fetchRoomsStatus = async () => {
    const res = await api.get('/rooms-status');
    console.log(res);
    const floor1 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 1);
    const floor2 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 2);
    const floor3 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 3);

    setRooms1(floor1);
    setRooms2(floor2);
    setRooms3(floor3);
    setStatus(res.data.status);
  };

  useEffect(() => {
    fetchRoomsStatus();
  }, []);

  console.log(status);
  return (
    <Page
      className={classes.root}
      title="สถานะการใช้ห้อง"
    >
      <Container maxWidth={false}>
        <Row style={{ border: '1px solid black', margin: '10px' }}>
          <Col>
            <h3>ชั้น 1</h3>
            <Row>
              {rooms1.map((room) => (
                <Col md={4} key={room.room_id} style={{ border: '1px solid black' }}>
                  {room.room_name}
                  {status.map((st) => {
                    const { booking_room: bookingRoom, ...rest } = st;
                    console.log(bookingRoom);
                    console.log(rest);

                    return rest.room_id === room.room_id && (
                      <p>{`วันที่ย้ายเข้า : ${bookingRoom.checkin_date} ${bookingRoom.checkin_time}`}</p>
                    );
                  })}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row style={{ border: '1px solid black', margin: '10px' }}>
          <Col>
            <h3>ชั้น 2</h3>
            <Row>
              {rooms2.map((room) => (
                <Col md={4} key={room.room_id} style={{ border: '1px solid black' }}>
                  {room.room_name}
                  {/* <BedCard
                    className={classes.bedCard}
                    room={room}
                  /> */}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row style={{ border: '1px solid black', margin: '10px' }}>
          <Col>
            <h3>ชั้น 3</h3>
            <Row>
              {rooms3.map((room) => (
                <Col md={4} key={room.room_id} style={{ border: '1px solid black' }}>
                  {room.room_name}
                  {/* <BedCard
                    className={classes.bedCard}
                    room={room}
                  /> */}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default RoomsStatus;
