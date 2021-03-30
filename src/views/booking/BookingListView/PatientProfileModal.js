import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  // makeStyles
} from '@material-ui/core';
import {
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchIpAll } from '../../../redux';

const PatientProfileModal = ({ isOpen, hideModal }) => {
  const dispatch = useDispatch();
  // const { ips, pager } = useSelector((state) => state.ip);

  useEffect(() => {
    dispatch(fetchIpAll());
  }, []);

  return (
    <>
      <Modal
        show={isOpen}
        onHide={hideModal}
        size="xl"
        style={{ top: '50px' }}
      >
        <Modal.Header closeButton>ข้อมูลผู้ป่วย</Modal.Header>
        <Modal.Body>
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography>Test</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Typography>Test</Typography>
            </Box>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

PatientProfileModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
};

export default PatientProfileModal;
