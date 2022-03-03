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
import { filterRoomByBuilding, filterRoomByFloor } from 'src/redux/room/roomSlice';

const MovingRoomModal = ({ isOpen, onHide }) => {
  const dispatch = useDispatch();
  const { filteredRooms } = useSelector((state) => state.room);
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');

  useEffect(() => {
    console.log('====================================');
    console.log('Reset inputs....');
    console.log('====================================');
    setBuilding('');
    setFloor('');
  }, [isOpen]);

  return (
    <Modal
      show={isOpen}
      onHide={onHide}
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
                  dispatch(filterRoomByBuilding(e.target.value));
                }}
              >
                <option value="">เลือกอาคาร</option>
                <option value="3">อาคาร 3</option>
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
                  dispatch(filterRoomByFloor(e.target.value));
                }}
              >
                <option value="">เลือกชั้น</option>
                <option value="1">ชั้น 1</option>
                <option value="2">ชั้น 2</option>
                <option value="3">ชั้น 3</option>
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>ห้อง</Form.Label>
              <select name="room" className="form-control">
                <option value="">เลือกห้อง</option>
                {filteredRooms && filteredRooms.map((room) => {
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
          onClick={() => {
            console.log(dispatch);
          }}
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
  onHide: PropTypes.func,
};

export default MovingRoomModal;
