import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { roomActions, bookingActions } from 'src/redux';

const MovingRoomModal = ({ isOpen, hideModal, booking }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { filteredRooms } = useSelector((state) => state.room);
  const { buildings } = useSelector((state) => state.building);
  const [floors, setFloors] = useState([]);
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    setBuilding('');
    setFloor('');
  }, [isOpen]);

  const setBuildingFloors = (id) => {
    const selectedBuilding = buildings.find((bd) => bd.building_id === id);

    if (selectedBuilding) {
      setFloors(selectedBuilding.vip_room.split(','));
    }
  };

  const onSave = () => {
    const { booking_room: bookingRoom } = booking;

    dispatch(bookingActions.changeRoom(
      {
        bookId: bookingRoom.book_id,
        newRoom: selectedRoom,
        user: auth.username
      }
    ));

    hideModal();
  };

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="lg"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>ย้ายไปห้อง</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>อาคาร</Form.Label>
              <select
                name="building"
                className="form-control"
                value={building}
                onChange={(e) => {
                  setBuilding(e.target.value);
                  setBuildingFloors(e.target.value);
                  dispatch(roomActions.filterRoomsByBuilding(e.target.value));
                }}
              >
                <option value="">เลือกอาคาร</option>
                {buildings && buildings.map((item) => {
                  return (
                    <option key={item.building_id} value={item.building_id}>
                      {item.building_name}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>ชั้น</Form.Label>
              <select
                name="floor"
                className="form-control"
                value={floor}
                onChange={(e) => {
                  setFloor(e.target.value);
                  dispatch(roomActions.filterRoomsByFloor(e.target.value));
                }}
              >
                <option value="">เลือกชั้น</option>
                {floors && floors.map((fl) => {
                  return (
                    <option key={fl} value={fl}>
                      ชั้น
                      {` ${fl}`}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>ห้อง</Form.Label>
              <select
                name="room"
                value={selectedRoom}
                className="form-control"
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="">เลือกห้อง</option>
                {filteredRooms && filteredRooms
                  .filter((filtered) => filtered.room_status === '0')
                  .map((room) => {
                    return (
                      <option key={room.room_id} value={room.room_id}>
                        {room.room_name}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onSave}
          endIcon={<SendIcon fontSize="small" />}
        >
          บันทึก
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovingRoomModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  booking: PropTypes.any
};

export default MovingRoomModal;
