import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import Toolbar from './Toolbar';
import { ipActions, patientActions } from '../../../../redux';
import calcAge from '../../../../utils';

function PatientModal({ isOpen, hideModal, onSelected }) {
  const dispatch = useDispatch();
  const { ips, pager } = useSelector((state) => state.ip);
  const { patients, pager: ptPager } = useSelector((state) => state.patient);
  const [ipOnly, setIpOnly] = useState(true);

  useEffect(() => {
    dispatch(ipActions.fetchAll({ qs: '' }));
    dispatch(patientActions.fetchPatients({ qs: '' }));
  }, []);

  const handlePageItemClick = (url, tbName) => {
    if (tbName === 'ip') {
      dispatch(ipActions.fetchAllWithPage({ url }));
    } else {
      dispatch(patientActions.fetchPatientsWithPage({ url }));
    }
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

        <Toolbar
          isIpOnly={ipOnly}
          handleSearch={(searchText) => {
            const qs = searchText ? `?search=${searchText}` : '';

            dispatch(ipActions.fetchAll(qs));
            dispatch(patientActions.fetchPatients({ qs }));
          }}
          handleIpOnlyChecked={(checked) => setIpOnly(checked)}
        />

        <table className="table table-bordered table-sm mt-2">
          <thead>
            <tr>
              <th style={{ width: '3%', textAlign: 'center' }}>#</th>
              {ipOnly && <th style={{ width: '10%', textAlign: 'center' }}>AN</th>}
              <th style={{ width: '8%', textAlign: 'center' }}>HN</th>
              <th>ชื่อ-สกุล</th>
              <th style={{ width: '8%', textAlign: 'center' }}>อายุ (ปี)</th>
              {ipOnly && <th style={{ width: '12%', textAlign: 'center' }}>วันที่ Admit</th>}
              {!ipOnly && <th style={{ width: '12%', textAlign: 'center' }}>วันที่มาล่าสุด</th>}
              {ipOnly && <th style={{ width: '20%' }}>วอร์ด</th>}
              <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ipOnly && ips && ips.map((ip, index) => (
              <tr key={ip.an}>
                <td style={{ textAlign: 'center' }}>{pager.from + index}</td>
                <td style={{ textAlign: 'center' }}>{ip.an}</td>
                <td style={{ textAlign: 'center' }}>{ip.hn}</td>
                <td>{`${ip.patient?.pname}${ip.patient?.fname} ${ip.patient?.lname}`}</td>
                <td style={{ textAlign: 'center' }}>
                  {calcAge(ip.patient?.birthday)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {moment(ip.regdate).format('DD/MM/YYYY')}
                </td>
                <td>{ip.ward?.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      onSelected(ip.patient, ip.an, ip.ward?.ward, ip.spclty);
                      hideModal();
                    }}
                    size="sm"
                  >
                    เลือก
                  </Button>
                </td>
              </tr>
            ))}

            {!ipOnly && patients && patients.map((patient, index) => (
              <tr key={patient.hn}>
                <td style={{ textAlign: 'center' }}>{ptPager.from + index}</td>
                <td style={{ textAlign: 'center' }}>{patient.hn}</td>
                <td>{`${patient.pname}${patient.fname} ${patient.lname}`}</td>
                <td style={{ textAlign: 'center' }}>
                  {calcAge(patient.birthday)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {moment(patient.last_visit).format('DD/MM/YYYY')}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      onSelected(patient, '', '');
                      hideModal();
                    }}
                    size="sm"
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
            <span style={{ margin: 'auto 5px', fontWeight: 'bold' }}>
              {ipOnly ? pager?.total : ptPager?.total}
            </span>
            ราย
          </Col>
          <Col>

            {ipOnly && (
              <Pagination className="float-right mb-0">
                <Pagination.First
                  onClick={() => handlePageItemClick(pager?.first_page_url, 'ip')}
                  disabled={pager?.current_page === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageItemClick(pager?.prev_page_url, 'ip')}
                  disabled={pager?.current_page === 1}
                />
                <Pagination.Next
                  onClick={() => handlePageItemClick(pager?.next_page_url, 'ip')}
                  disabled={pager?.current_page === pager?.last_page}
                />
                <Pagination.Last
                  onClick={() => handlePageItemClick(pager?.last_page_url, 'ip')}
                  disabled={pager?.current_page === pager?.last_page}
                />
              </Pagination>
            )}

            {!ipOnly && (
              <Pagination className="float-right mb-0">
                <Pagination.First
                  onClick={() => handlePageItemClick(ptPager?.first_page_url, 'patient')}
                  disabled={ptPager?.current_page === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageItemClick(ptPager?.prev_page_url, 'patient')}
                  disabled={ptPager?.current_page === 1}
                />
                <Pagination.Next
                  onClick={() => handlePageItemClick(ptPager?.next_page_url, 'patient')}
                  disabled={ptPager?.current_page === ptPager?.last_page}
                />
                <Pagination.Last
                  onClick={() => handlePageItemClick(ptPager?.last_page_url, 'patient')}
                  disabled={ptPager?.current_page === ptPager?.last_page}
                />
              </Pagination>
            )}

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
