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
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  // Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StarIcon from '@material-ui/icons/Star';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  bookings,
  onViewDetailClick,
  ...rest
}) => {
  const classes = useStyles();
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                <TableCell width="15%">
                  ผู้จอง
                </TableCell>
                <TableCell align="center" width="12%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {bookings.slice(0, limit).map((booking) => (
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
                      {`${booking.an?.an}`}
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
                        {`${booking.an?.patient?.pname}${booking.an?.patient?.fname} ${booking.an?.patient?.lname}`}
                      </Typography>
                      {booking.is_officer === '1' && <StarIcon style={{ fill: 'red' }} fontSize="small" />}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.an?.regdate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    {moment(booking.book_date).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    {`${booking.an?.patient?.hometel}`}
                  </TableCell>
                  <TableCell>
                    {booking.an?.ward?.name}
                  </TableCell>
                  <TableCell>
                    {`${booking.user?.person_firstname} ${booking.user?.person_lastname}`}
                  </TableCell>
                  <TableCell align="center">
                    <a href="#" title="รายละเอียด" onClick={() => onViewDetailClick(booking.an.an)}>
                      <VisibilityIcon color="primary" />
                    </a>
                    <Link to={`/app/bookings/edit/${booking.book_id}`} title="แก้ไข">
                      <EditIcon color="secondary" />
                    </Link>
                    <a href="#" title="ลบ">
                      <DeleteIcon color="error" />
                    </a>
                    <Link to={`/app/checkin/${booking.book_id}`} title="รับผู้ป่วยเข้าห้อง">
                      <ExitToAppIcon color="action" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={bookings.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  bookings: PropTypes.array.isRequired,
  onViewDetailClick: PropTypes.func,
};

export default Results;
