import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Row,
  Modal,
  Pagination
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ipActions } from '../../../redux';

function PatientModal({ isOpen, hideModal, onSelected }) {
  const dispatch = useDispatch();
  const { ips, pager } = useSelector((state) => state.ip);

  useEffect(() => {
    dispatch(ipActions.fetchIpAll());
  }, []);

  const handlePageItemClick = (url) => {
    dispatch(ipActions.fetchIpAllWithPage(url));
  };

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="xl"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>กรุณาเลือกผู้ป่วย</Modal.Header>
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
              <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ips && ips.map((ip, index) => (
              <tr key={ip.an}>
                <td style={{ textAlign: 'center' }}>{pager.from + index}</td>
                <td style={{ textAlign: 'center' }}>{ip.an}</td>
                <td style={{ textAlign: 'center' }}>{ip.hn}</td>
                <td>{`${ip.patient?.pname}${ip.patient?.fname} ${ip.patient?.lname}`}</td>
                <td style={{ textAlign: 'center' }}>{ip.regdate}</td>
                <td>{ip.ward?.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button onClick={() => {
                    onSelected(`${ip.an}-${ip.patient?.pname}${ip.patient?.fname} ${ip.patient?.lname}`);
                    hideModal();
                  }}
                  >
                    เลือก
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Row>
          <Col>
            จำนวนทั้งหมด
            <span style={{ margin: 'auto 5px', fontWeight: 'bold' }}>{pager?.total}</span>
            ราย
          </Col>
          <Col>
            <Pagination className="float-right">
              <Pagination.First
                onClick={() => handlePageItemClick(pager?.first_page_url)}
                disabled={pager?.current_page === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageItemClick(pager?.prev_page_url)}
                disabled={pager?.current_page === 1}
              />
              {/* <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item> */}
              <Pagination.Next
                onClick={() => handlePageItemClick(pager?.next_page_url)}
                disabled={pager?.current_page === pager?.last_page}
              />
              <Pagination.Last
                onClick={() => handlePageItemClick(pager?.last_page_url)}
                disabled={pager?.current_page === pager?.last_page}
              />
            </Pagination>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

PatientModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSelected: PropTypes.func,
};

export default PatientModal;
