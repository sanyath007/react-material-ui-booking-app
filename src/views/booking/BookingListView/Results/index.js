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
                <TableCell align="center" width="8%">AN</TableCell>
                <TableCell>ผู้ป่วย</TableCell>
                <TableCell align="center" width="8%">วันที่ Admit</TableCell>
                <TableCell align="center" width="8%">วันที่จอง</TableCell>
                {(screenW > 960) && <TableCell align="center" width="12%">เบอร์ติดต่อ</TableCell>}
                <TableCell width="12%">วอร์ด</TableCell>
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
                      {`${booking.ip?.an}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {(screenW > 1280) && (
                        <Avatar className={classes.avatar} src={booking.avatarUrl}>
                          {getInitials('DN Hospital')}
                        </Avatar>
                      )}
                      <Typography color="textPrimary" variant="body1">
                        {`${booking.ip?.patient?.pname}${booking.ip?.patient?.fname} ${booking.ip?.patient?.lname}`}
                      </Typography>
                      {booking.is_officer === '1' && <StarIcon style={{ fill: 'red' }} fontSize="small" />}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.ip?.regdate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.book_date).format('DD/MM/YYYY')}
                  </TableCell>
                  {(screenW > 960) && (
                    <TableCell align="center">{`${booking.ip?.patient?.hometel}`}</TableCell>
                  )}
                  <TableCell>{booking.ip?.ward?.name}</TableCell>
                  {(screenW > 960) && (
                    <TableCell>
                      {`${booking.user?.person_firstname} ${booking.user?.person_lastname}`}
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <Link
                      to={`/app/bookings/${booking.book_id}/detail`}
                      title="รายละเอียด"
                      // onClick={() => onViewDetailClick(booking.ip?.an)}
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      to={`/app/bookings/${booking.book_id}/edit`}
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
                        onClick={() => console.log('On delete action...')}
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
