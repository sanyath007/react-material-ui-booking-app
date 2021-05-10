import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // Typography,
  makeStyles
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({

}));

const BookingHistoryList = ({
  className,
  bookings,
  pager,
  ...rest
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    // onPageChange(pager.path, newPage);
  };

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
                <TableCell align="center" width="5%">#</TableCell>
                <TableCell align="center" width="20%">วันที่จอง</TableCell>
                <TableCell align="center" width="20%">วันที่รับเข้า</TableCell>
                <TableCell align="center" width="20%">วันที่รับออก</TableCell>
                <TableCell align="center">วอร์ด</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">{moment().format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">{moment().format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">{moment().format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">xxx</TableCell>
              </TableRow>
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

BookingHistoryList.propTypes = {
  className: PropTypes.string,
  bookings: PropTypes.array,
  pager: PropTypes.object
};

export default BookingHistoryList;
