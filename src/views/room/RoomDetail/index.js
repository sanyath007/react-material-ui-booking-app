import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  Container,
  Icon,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Page from 'src/components/Page';
import StarIcon from '@material-ui/icons/Star';
import { roomActions } from '../../../redux';

const useStyles = makeStyles(() => ({
  root: {},
  ratings: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 20px',
  },
  ratingItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

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
                <div style={{ display: 'flex' }}>
                  <span>test</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '360px',
                    overflow: 'hidden',
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ width: '50%' }}>
                    <img
                      src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      width: '25%',
                      padding: '0 10px',
                    }}
                  >
                    <img
                      src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
                      alt=""
                      style={{
                        width: '100%',
                        height: '50%',
                      }}
                    />
                    <img
                      src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
                      alt=""
                      style={{
                        width: '100%',
                        height: '50%',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      width: '25%'
                    }}
                  >
                    <img
                      src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
                      alt=""
                      style={{
                        width: '100%',
                        height: '50%',
                      }}
                    />
                    <img
                      src={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
                      alt=""
                      style={{
                        width: '100%',
                        height: '50%',
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: 'relative',
                    marginTop: '10px'
                  }}
                >
                  <h5>รายละเอียด</h5>
                  <p>{room.description}</p>
                  <a href="#">Show more</a>
                </div>

                <hr />

                <div
                  style={{
                    position: 'relative',
                    marginTop: '10px'
                  }}
                >
                  <h5>สิ่งอำนวยความสะดวก</h5>
                  <div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>bathtub</Icon>
                      <span style={{ marginLeft: '10px' }}>ห้องน้ำ</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>shower</Icon>
                      <span style={{ marginLeft: '10px' }}>เครื่องทำน้ำอุ่น</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>bed</Icon>
                      <span style={{ marginLeft: '10px' }}>เตียงไฟฟ้า</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>tv</Icon>
                      <span style={{ marginLeft: '10px' }}>โทรทัศน์</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>air</Icon>
                      <span style={{ marginLeft: '10px' }}>เครื่องปรับอากาศ</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>kitchen</Icon>
                      <span style={{ marginLeft: '10px' }}>ตู้เย็น</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>microwave</Icon>
                      <span style={{ marginLeft: '10px' }}>ไมโครเวฟ</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>checkroom</Icon>
                      <span style={{ marginLeft: '10px' }}>ตู้เสื้อผ้า</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>chair</Icon>
                      <span style={{ marginLeft: '10px' }}>โซฟา</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>table_bar</Icon>
                      <span style={{ marginLeft: '10px' }}>โต๊ะอาหาร</span>
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                      <Icon>wifi</Icon>
                      <span style={{ marginLeft: '10px' }}>Wifi</span>
                    </div>
                  </div>
                  <a href="#">Show more</a>
                </div>

                <hr />

                <div
                  style={{
                    position: 'relative',
                    marginTop: '10px'
                  }}
                >
                  {/* TITLE */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>Reviews</h5>
                    <h6>
                      <StarIcon />
                      4.8 · 61 reviews
                    </h6>
                  </div>
                  {/* RATING */}
                  <div className={classes.ratings}>
                    <div className={classes.ratingItem}>
                      <span>Cleanliness</span>
                      <Rating name="size-small" defaultValue={4} size="small" />
                    </div>
                    <div className={classes.ratingItem}>
                      Accuracy
                      <Rating name="size-small" defaultValue={2} size="small" />
                    </div>
                    <div className={classes.ratingItem}>
                      Location
                      <Rating name="size-small" defaultValue={3} size="small" />
                    </div>
                    <div className={classes.ratingItem}>
                      Communication
                      <Rating name="size-small" defaultValue={5} size="small" />
                    </div>
                  </div>
                  {/* USER COMMENT */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '20px'
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 56, height: 56 }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <h5 style={{ margin: '0' }}>Kobe Jr</h5>
                      <p style={{ margin: '0', fontSize: '12px' }}>12/03/2020</p>
                      <p style={{ margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
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
