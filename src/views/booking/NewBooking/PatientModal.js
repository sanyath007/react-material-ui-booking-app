import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchIpAll } from '../../../redux';

function PatientModal({ isOpen, hideModal, onSelected }) {
  const dispatch = useDispatch();
  const { ips } = useSelector((state) => state.ip);

  useEffect(() => {
    dispatch(fetchIpAll());
  }, []);

  console.log(ips);

  return (
    <>
      <Modal show={isOpen} onHide={hideModal} style={{ top: '100px' }} size="xl">
        <Modal.Header>กรุณาเลือกผู้ป่วย</Modal.Header>
        <Modal.Body>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: '3%', textAlign: 'center' }}>#</th>
                <th style={{ width: '10%', textAlign: 'center' }}>AN</th>
                <th style={{ width: '10%', textAlign: 'center' }}>HN</th>
                <th>ชื่อ-สกุล</th>
                <th style={{ width: '12%', textAlign: 'center' }}>วันที่ Admit</th>
                <th style={{ width: '20%' }}>วอร์ด</th>
                <th style={{ width: '10%', textAlign: 'center' }}>เลือก</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td style={{ textAlign: 'center' }}>640002016</td>
                <td style={{ textAlign: 'center' }}>0329895</td>
                <td>xxxx xxxxxx</td>
                <td style={{ textAlign: 'center' }}>2021-02-16</td>
                <td>cc</td>
                <td style={{ textAlign: 'center' }}>
                  <Button onClick={() => {
                    onSelected('640002016');
                    hideModal();
                  }}
                  >
                    เลือก
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>ปิด</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PatientModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSelected: PropTypes.func,
};

export default PatientModal;
