import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  IconButton,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';

const RoomCard = ({ className, room, ...rest }) => {
  const classes = useStyles();

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
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={room.room_name}
        subheader="September 14, 2016"
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
          {room.building?.building_name}
        </Typography>
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
              Edit
            </Button>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button
              variant="contained"
              className={classes.deleteBtn}
              startIcon={<DeleteIcon className={classes.statsIcon} />}
            >
              Delete
            </Button>
          </Grid>
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
