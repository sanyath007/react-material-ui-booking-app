import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { bookingActions } from '../../../redux';

const useStyles = makeStyles(() => ({

}));

const BookingHistoryList = ({
  className,
  booking,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookings, pager } = useSelector((state) => state.booking);
  const [page, setPage] = useState(0);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    // onPageChange(pager.path, newPage);
  };

  useEffect(() => {
    dispatch(bookingActions.fetchHistories({ id: booking.book_id, hn: booking.hn }));
  }, [booking]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Typography gutterBottom variant="h4">
          ประวัติการพักห้องพิเศษ
        </Typography>

        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="5%">#</TableCell>
                  <TableCell align="center" width="20%">วันที่จอง</TableCell>
                  <TableCell align="center" width="20%">วันที่รับเข้า</TableCell>
                  <TableCell align="center" width="20%">วันที่รับออก</TableCell>
                  <TableCell align="center">ห้อง</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings && bookings.map((history) => {
                  return history.checkin ? (
                    <TableRow hover key={history.book_id}>
                      <TableCell align="center">{history.book_id}</TableCell>
                      <TableCell align="center">
                        {moment(history.book_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {moment(history.checkin?.checkin_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {moment(history.checkin?.checkout_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {history.checkin?.room?.room_name}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow hover key={history.book_id}>
                      <TableCell align="center" colSpan={5} style={{ color: 'red' }}>
                        -- ไม่พบข้อมูลการเข้าพัก --
                      </TableCell>
                    </TableRow>
                  );
                })}
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
      </CardContent>
    </Card>
  );
};

BookingHistoryList.propTypes = {
  className: PropTypes.string,
  booking: PropTypes.object,
};

export default BookingHistoryList;
