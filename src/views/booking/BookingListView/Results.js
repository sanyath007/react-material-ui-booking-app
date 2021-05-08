import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StarIcon from '@material-ui/icons/Star';
// import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  viewBtn: {
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  editBtn: {
    color: theme.palette.warning.dark,
    '&:hover': {
      color: theme.palette.warning.main
    }
  },
  delBtn: {
    color: theme.palette.error.dark,
    '&:hover': {
      color: theme.palette.error.main
    }
  },
  dchBtn: {
    color: '#525252',
    '&:hover': {
      color: '#716e77'
    }
  },
  checkinBtn: {
    color: theme.palette.success.dark,
    '&:hover': {
      color: theme.palette.success.main
    }
  }
}));

const Results = ({
  className,
  bookings,
  pager,
  onViewDetailClick,
  onPageChange,
  ...rest
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = bookings.map((booking) => booking.book_id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    onPageChange(pager.path, newPage);
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
                {/* <TableCell padding="checkbox"> */}
                <TableCell align="center" width="8%">
                  AN
                  {/* <Checkbox
                    checked={selectedCustomerIds.length === bookings.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < bookings.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>
                  ผู้ป่วย
                </TableCell>
                <TableCell align="center" width="8%">
                  วันที่ Admit
                </TableCell>
                <TableCell align="center" width="8%">
                  วันที่จอง
                </TableCell>
                <TableCell align="center" width="12%">
                  เบอร์ติดต่อ
                </TableCell>
                <TableCell width="12%">
                  วอร์ด
                </TableCell>
                <TableCell width="12%">
                  ผู้บันทึก
                </TableCell>
                <TableCell align="center" width="12%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {bookings && bookings.map((booking) => (
                <TableRow
                  hover
                  key={booking.book_id}
                  // selected={selectedCustomerIds.indexOf(booking.book_id) !== -1}
                >
                  {/* <TableCell padding="checkbox"> */}
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {`${booking.ip?.an}`}
                    </Typography>
                    {/* <Checkbox
                      checked={selectedCustomerIds.indexOf(booking.book_id) !== -1}
                      onChange={(event) => handleSelectOne(event, booking.book_id)}
                      value="true"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={booking.avatarUrl}
                      >
                        {getInitials('DN Hospital')}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
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
                  <TableCell align="center">
                    {`${booking.ip?.patient?.hometel}`}
                  </TableCell>
                  <TableCell>
                    {booking.ip?.ward?.name}
                  </TableCell>
                  <TableCell>
                    {`${booking.user?.person_firstname} ${booking.user?.person_lastname}`}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      to=""
                      title="รายละเอียด"
                      onClick={() => onViewDetailClick(booking.ip?.an)}
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      to={`/app/bookings/edit/${booking.book_id}`}
                      title="แก้ไข"
                      className={classes.editBtn}
                    >
                      <EditIcon />
                    </Link>
                    <Link to="" title="ยกเลิก" className={classes.delBtn}>
                      <DeleteIcon />
                    </Link>
                    {/* <Link to="" title="จำหน่าย" className={classes.dchBtn}>
                      <MeetingRoomIcon />
                    </Link> */}
                    {/* <Link
                      to={`/app/checkin/${booking.book_id}`}
                      title="รับผู้ป่วยเข้าห้อง"
                      className={classes.checkinBtn}
                    >
                      <ExitToAppIcon />
                    </Link> */}
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
  bookings: PropTypes.array.isRequired,
  pager: PropTypes.object,
  onViewDetailClick: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default Results;
