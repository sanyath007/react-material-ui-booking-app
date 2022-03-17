import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import Swal from 'sweetalert2';
import Pagination from '@material-ui/lab/Pagination';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import getInitials from 'src/utils/getInitials';
import PopperIcon from 'src/components/PopperIcon';
import useStyles from './styles';
import { bookingActions } from '../../../../redux';

const Results = ({
  className,
  bookings,
  pager,
  onViewDetailClick,
  onPageChange,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [screenW, setScreenW] = useState(window.innerWidth);

  const updateWindowDimensions = () => {
    setScreenW(window.innerWidth);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    onPageChange(pager.path, newPage);
  };

  const handleDelete = (event, id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการลบข้อมูลการจอง ID: ${id} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookingActions.destroy({ id, navigate }));
      }
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="3%">#</TableCell>
                <TableCell align="center" width="8%">HN</TableCell>
                <TableCell>ผู้ป่วย</TableCell>
                <TableCell align="center" width="8%">วันที่จอง</TableCell>
                {(screenW > 960) && <TableCell align="center" width="20%">ผู้จอง</TableCell>}
                {(screenW > 960) && <TableCell width="10%">ผู้บันทึก</TableCell>}
                <TableCell align="center" width="12%">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {bookings && bookings.map((booking, index) => (
                <TableRow hover key={booking.book_id}>
                  <TableCell align="center">
                    <Typography color="textPrimary" variant="body1">
                      {pager.from + index}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {`${booking.hn}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {(screenW > 1280) && (
                        <Avatar className={classes.avatar} src={booking.avatarUrl}>
                          {getInitials('DN Hospital')}
                        </Avatar>
                      )}
                      <Box>
                        {booking.patient?.admit && (
                          <Typography variant="subtitle2" component="p">
                            <span>AN : </span>
                            {`${booking.patient.admit?.an}`}
                          </Typography>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography color="textPrimary" variant="body1">
                            {`${booking.patient?.pname}${booking.patient?.fname} ${booking.patient?.lname}`}
                          </Typography>
                          {booking.in_labour === '1'
                            ? <PopperIcon icon="child_friendly" iconColor="primary" />
                            : null}
                          {booking.newborn.length > 0
                            ? (
                              <PopperIcon icon="child_care" iconColor="secondary">
                                <div style={{ fontSize: '14px', padding: '10px' }}>
                                  <p style={{ margin: '2px' }}>
                                    <span style={{ width: '2px' }}>AN : </span>
                                    <span>{booking.newborn[0].an}</span>
                                  </p>
                                  <p style={{ margin: '2px' }}>
                                    <span style={{ width: '14px' }}>HN : </span>
                                    <span>{booking.newborn[0].hn}</span>
                                  </p>
                                  <p style={{ margin: '2px' }}>
                                    <span>ชื่อ : </span>
                                    <span>
                                      {`${booking.newborn[0].patient?.pname}${booking.newborn[0].patient?.fname} ${booking.newborn[0].patient?.lname}`}
                                    </span>
                                  </p>
                                </div>
                              </PopperIcon>
                            ) : null}
                        </div>
                      </Box>
                      {booking.is_officer === '1' && <StarIcon style={{ fill: 'red' }} fontSize="small" />}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.book_date).format('DD/MM/YYYY')}
                  </TableCell>
                  {(screenW > 960) && (
                    <TableCell align="center">
                      <p style={{ margin: '0' }}>{`${booking.book_name}`}</p>
                      <div style={{ margin: '0' }}>
                        <PhoneAndroidIcon fontSize="small" />
                        {`${booking.book_tel}`}
                      </div>
                    </TableCell>
                  )}
                  {(screenW > 960) && (
                    <TableCell>{booking.created_by}</TableCell>
                  )}
                  <TableCell align="center">
                    <Link to={`${booking.book_id}/detail`} title="รายละเอียด">
                      <VisibilityIcon />
                    </Link>
                    <Link
                      to={`${booking.book_id}/edit`}
                      title="แก้ไข"
                      className={classes.editBtn}
                    >
                      <EditIcon />
                    </Link>
                    {[1].includes(parseInt(auth.role, 10)) && (
                      <Link
                        to=""
                        title="ลบ"
                        className={classes.delBtn}
                        onClick={(e) => handleDelete(e, booking.book_id)}
                      >
                        <DeleteIcon />
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <Pagination
        count={pager?.last_page}
        page={page}
        onChange={handlePageChange}
        style={{ padding: '5px' }}
      />

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  bookings: PropTypes.array,
  pager: PropTypes.object,
  onViewDetailClick: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default Results;
