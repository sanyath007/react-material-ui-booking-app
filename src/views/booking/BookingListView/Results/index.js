import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Pagination from '@material-ui/lab/Pagination';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';
import useStyles from './styles';

const Results = ({
  className,
  bookings,
  pager,
  onViewDetailClick,
  onPageChange,
  ...rest
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [screenW, setScreenW] = useState(window.innerWidth);
  const { auth } = useSelector((state) => state.auth);

  const updateWindowDimensions = () => {
    setScreenW(window.innerWidth);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    onPageChange(pager.path, newPage);
  };

  /** TODO: To handle on delete action */
  const handleDelete = (event, booking) => {
    console.log('On delete action...');
    console.log(booking);
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
                {(screenW > 960) && <TableCell align="center" width="12%">เบอร์ติดต่อ</TableCell>}
                {(screenW > 960) && <TableCell width="12%">ผู้บันทึก</TableCell>}
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
                        {booking.patient.admit && (
                          <Typography variant="subtitle2" component="p">
                            <span>AN : </span>
                            {`${booking.patient.admit?.an}`}
                          </Typography>
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {`${booking.patient?.pname}${booking.patient?.fname} ${booking.patient?.lname}`}
                        </Typography>
                      </Box>
                      {booking.is_officer === '1' && <StarIcon style={{ fill: 'red' }} fontSize="small" />}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.book_date).format('DD/MM/YYYY')}
                  </TableCell>
                  {(screenW > 960) && (
                    <TableCell align="center">{`${booking.patient?.hometel}`}</TableCell>
                  )}
                  {(screenW > 960) && (
                    <TableCell>
                      {`${booking.user?.person_firstname} ${booking.user?.person_lastname}`}
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <Link
                      to={`${booking.book_id}/detail`}
                      title="รายละเอียด"
                      // onClick={() => onViewDetailClick(booking.ip?.an)}
                    >
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
                        onClick={(e) => handleDelete(e, booking)}
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
