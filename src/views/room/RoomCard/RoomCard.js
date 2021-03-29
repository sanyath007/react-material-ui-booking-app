import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
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
          <Grid
            className={classes.statsItem}
            item
          >
            {/* // TODO: separate and create updated time component */}
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {room.totalDownloads}
              {' '}
              Downloads
            </Typography>
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
