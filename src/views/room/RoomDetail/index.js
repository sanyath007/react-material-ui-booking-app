import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { roomActions } from '../../../redux';
import ImageLists from './ImageLists';
import AmenityLists from './AmenityLists';
import Ratings from './Ratings';
import Comments from './Comments';

const useStyles = makeStyles(() => ({
  root: {},
}));

const amenities = [];

const RoomDetail = () => {
  const classes = useStyles();
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(roomActions.fetchRoom({ id: roomId }));
  }, [roomId]);

  return (
    <Page className={classes.root} title="รายละเอียดห้องพิเศษ">
      <Container maxWidth={false}>
        <Box my={3}>
          <Card className={classes.root}>
            <PerfectScrollbar>
              <div style={{ padding: '20px' }}>
                <h3>{room.room_name}</h3>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '5px' }}>
                      <StarIcon color="secondary" />
                      4.8
                    </span>
                    ·
                    <span style={{ marginLeft: '5px' }}>
                      <a href="">61 reviews</a>
                    </span>
                  </div>
                  <div style={{ width: '30%', textAlign: 'right' }}>
                    <span style={{ marginRight: '10px' }}>
                      <ShareIcon />
                      <a href="">Share</a>
                    </span>
                    <span>
                      <FavoriteBorderIcon />
                      <a href="">Like</a>
                    </span>
                  </div>
                </div>

                <ImageLists room={room} />

                <div style={{ position: 'relative', marginTop: '20px' }}>
                  <h5>รายละเอียด</h5>
                  <p>{room.description}</p>
                  <a href="#">Show more</a>
                </div>

                <hr />

                <div style={{ position: 'relative', marginTop: '10px' }}>
                  <h5>สิ่งอำนวยความสะดวก</h5>
                  <AmenityLists amenities={amenities} />
                  <a href="#">Show more</a>
                </div>

                <hr />

                <div style={{ position: 'relative', marginTop: '10px' }}>
                  {/* TITLE */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Reviews</h5>
                    <h6>
                      <StarIcon />
                      4.8 · 61 reviews
                    </h6>
                  </div>

                  {/* RATING */}
                  <Ratings />

                  {/* USER COMMENT */}
                  <Comments />

                </div>
              </div>
            </PerfectScrollbar>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default RoomDetail;
