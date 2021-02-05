import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import useStyles from './styles';

const RoomCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            src={product.room_img_url}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.room_name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
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
              {product.totalDownloads}
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
  product: PropTypes.object.isRequired
};

export default RoomCard;
