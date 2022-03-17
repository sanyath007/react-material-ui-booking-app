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
import { roomActions } from '../../../redux';
import ImageLists from './ImageLists';
import AmenityLists from './AmenityLists';
import Ratings from './Ratings';
import Comments from './Comments';
import SubTitle from './SubTitle';
import ActionsButton from './ActionsButton';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ratings = [
  {
    id: 1,
    name: 'Cleanliness',
    value: 4.5
  },
  {
    id: 2,
    name: 'Location',
    value: 4
  },
  {
    id: 3,
    name: 'Accuracy',
    value: 3
  },
  {
    id: 4,
    name: 'Communication',
    value: 3
  }
];

const comments = [
  // {
  //   id: 1,
  //   user: 'Kobe Jr',
  //   date: '2022-03-12',
  //   comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  // },
  // {
  //   id: 2,
  //   user: 'Query',
  //   date: '2022-03-14',
  //   comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  // }
];

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
                <SubTitle />

                <ImageLists room={room} />

                <div style={{ position: 'relative', margin: '20px 0', color: '#525252' }}>
                  <h5>รายละเอียด</h5>
                  <p style={{ margin: '0' }}>
                    <span>ที่ตั้ง : </span>
                    <span style={{ marginRight: '20px' }}>{room.building?.building_name}</span>
                    <span>ชั้นที่ : </span>
                    <span style={{ marginRight: '20px' }}>{room.floor}</span>
                    <span>ประเภท : </span>
                    <span style={{ marginRight: '20px' }}>{room.room_type?.room_type_name}</span>
                    <span>ชนิด : </span>
                    <span style={{ marginRight: '20px' }}>{room.room_group?.room_group_name}</span>
                    <span>ราคา/วัน : </span>
                    <span style={{ marginRight: '20px' }}>
                      {`${room.price ? room.price : '-'} บาท`}
                    </span>
                  </p>
                  <p style={{ margin: '0' }}>{room.description}</p>

                  <ActionsButton room={room} />
                </div>

                <hr />

                <div style={{ position: 'relative', marginTop: '10px' }}>
                  <h5>สิ่งอำนวยความสะดวก</h5>
                  <AmenityLists amenities={room.amenities} />
                </div>

                <hr />

                <div style={{ position: 'relative', marginTop: '10px' }}>
                  {/* TITLE */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Reviews</h5>
                    <h6 style={{ color: '#525252' }}>
                      <StarIcon color="secondary" />
                      4.8 · 61 reviews
                    </h6>
                  </div>

                  {/* RATING */}
                  {ratings && <Ratings ratings={ratings} />}

                  {/* USER COMMENT */}
                  {comments && <Comments comments={comments} />}
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
