import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import { Button } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import { useSelector } from 'react-redux';

const MovingRoomModal = ({ isOpen, onHide }) => {
  // const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  console.log(rooms);

  return (
    <Modal
      show={isOpen}
      onHide={onHide}
      size="lg"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>ย้ายห้อง</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>อาคาร</Form.Label>
              <select name="building" className="form-control">
                <option value="">เลือกอาคาร</option>
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>ห้อง</Form.Label>
              <select name="room" className="form-control">
                <option value="">เลือกห้อง</option>
                {rooms && rooms.map((room) => {
                  return <option value={room.room_id}>{room.room_name}</option>;
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
            console.log('test');
          }}
          endIcon={<CachedIcon fontSize="small" />}
        >
          บันทึก
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovingRoomModal.propTypes = {
  isOpen: PropTypes.bool,
  onHide: PropTypes.func
};

export default MovingRoomModal;
