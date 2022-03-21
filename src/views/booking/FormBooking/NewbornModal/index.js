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
import moment from 'moment';
import Toolbar from './Toolbar';
import { newbornActions } from '../../../../redux';
import { calcAge } from '../../../../utils';

function NewbornModal({ isOpen, hideModal, onSelected }) {
  const dispatch = useDispatch();
  const { newborns, pager } = useSelector((state) => state.newborn);

  useEffect(() => {
    dispatch(newbornActions.fetchAll({ params: '' }));
  }, [isOpen]);

  const handlePageItemClick = (url) => {
    dispatch(newbornActions.fetchAllWithPage({ url }));
  };

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="xl"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>กรุณาเลือกเด็กแรกเกิด</Modal.Header>
      <Modal.Body>

        <Toolbar
          handleSearch={(searchText) => {
            const qs = searchText ? `?search=${searchText}` : '';

            dispatch(newbornActions.fetchAll({ params: qs }));
          }}
        />

        <table className="table table-bordered table-sm mt-2">
          <thead>
            <tr>
              <th style={{ width: '3%', textAlign: 'center' }}>#</th>
              <th style={{ width: '10%', textAlign: 'center' }}>AN</th>
              <th style={{ width: '8%', textAlign: 'center' }}>HN</th>
              <th>ชื่อ-สกุล</th>
              <th style={{ width: '8%', textAlign: 'center' }}>อายุ (ปี)</th>
              <th style={{ width: '12%', textAlign: 'center' }}>วันที่คลอด</th>
              <th style={{ width: '20%' }}>วอร์ด</th>
              <th style={{ width: '8%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newborns && newborns.map((newborn, index) => (
              <tr key={newborn.an}>
                <td style={{ textAlign: 'center' }}>{pager.from + index}</td>
                <td style={{ textAlign: 'center' }}>{newborn.an}</td>
                <td style={{ textAlign: 'center' }}>{newborn.hn}</td>
                <td>{`${newborn?.pname}${newborn?.fname} ${newborn?.lname}`}</td>
                <td style={{ textAlign: 'center' }}>
                  {calcAge(newborn?.birthday)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {moment(newborn.regdate).format('DD/MM/YYYY')}
                </td>
                <td>test</td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      onSelected({
                        hn: newborn.hn,
                        an: newborn.an,
                        name: `${newborn?.pname}${newborn?.fname} ${newborn?.lname}`
                      });
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
              {pager?.total}
            </span>
            ราย
          </Col>
          <Col>

            <Pagination className="float-right mb-0">
              <Pagination.First
                onClick={() => handlePageItemClick(pager?.first_page_url)}
                disabled={pager?.current_page === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageItemClick(pager?.prev_page_url)}
                disabled={pager?.current_page === 1}
              />
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

NewbornModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  onSelected: PropTypes.func,
};

export default NewbornModal;
