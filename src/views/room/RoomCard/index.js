import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { Badge } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import OverflowMenu from '../../../components/OverflowMenu';
import { roomActions } from '../../../redux';

const roomStatuses = [
  { id: 0, name: 'ว่าง' },
  { id: 1, name: 'ใช้งานอยู่' },
  { id: 2, name: 'ปิดปรับปรุง' },
  { id: 3, name: 'งดใช้ชั่วคราว' },
  { id: 9, name: 'ยกเลิกการใช้' }
];

const RoomCard = ({ className, room, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);

  const renderBadgeRoomStatus = (status) => {
    let badgeColor = '';
    if (status === '0') {
      badgeColor = 'success';
    } else if (status === '1') {
      badgeColor = 'danger';
    } else {
      badgeColor = 'secondary';
    }

    return badgeColor;
  };

  const handleOverflowMenuSelected = (selectedIndex) => {
    console.log(room.room_id, selectedIndex);
    dispatch(roomActions.updateStatus(room.room_id, selectedIndex, navigate));
  };

  const handleDelete = (id) => {
    if (window.confirm(`คุณต้องการลบห้องพิเศษรหัส ${id} ใช่หรือไม่?`)) {
      console.log(id);
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        )}
        action={[0, 2, 3, 9].includes(parseInt(room.room_status, 10))
          ? (
            <OverflowMenu
              items={roomStatuses.filter((rs) => {
                return ![1, parseInt(room.room_status, 10)].includes(rs.id);
              })}
              onSelected={handleOverflowMenuSelected}
            />
          ) : null}
        title={room.room_name}
        // subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
        title={room.room_name}
      />
      <CardContent>
        <Typography
          align="left"
          color="textPrimary"
          variant="body1"
        >
          {room.description}
        </Typography>
        <Typography
          color="textSecondary"
          display="inline"
          variant="body2"
        >
          {`ชั้น ${room.floor} ${room.building?.building_name}`}
        </Typography>
        <Typography
          align="left"
          color="textSecondary"
          variant="body1"
        >
          {room.room_type?.room_type_name}
        </Typography>
        <Badge
          pill
          variant={renderBadgeRoomStatus(room.room_status)}
          className="p-1"
        >
          {roomStatuses.find((rs) => rs.id === parseInt(room.room_status, 10))?.name}
        </Badge>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid className={classes.statsItem} item>
            <Button
              variant="contained"
              className={classes.editBtn}
              endIcon={<EditIcon className={classes.statsIcon} />}
              component={Link}
              to={`/app/rooms/edit/${room.room_id}`}
            >
              แก้ไข
            </Button>
          </Grid>
          {auth.role === '1' && (
            <Grid className={classes.statsItem} item>
              <Button
                variant="contained"
                className={classes.deleteBtn}
                startIcon={<DeleteIcon className={classes.statsIcon} />}
                onClick={() => handleDelete(room.room_id)}
              >
                ลบ
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  );
};

RoomCard.propTypes = {
  className: PropTypes.string,
  room: PropTypes.object.isRequired
};

export default RoomCard;
