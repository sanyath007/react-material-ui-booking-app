import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  textMuted: {
    color: theme.palette.text.secondary
  },
}));

const IpInfo = ({ booking }) => {
  const classes = useStyles();
  console.log(booking);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h4">
          ข้อมูลการจองห้อง
        </Typography>
        <Grid container spacing={2} style={{ marginTop: '10px', padding: '10px' }}>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>AN</Typography>
            <Typography>{booking?.patient?.admit?.an}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>HN</Typography>
            <Typography>{booking?.hn}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>สิทธิการรักษา</Typography>
            <Typography>{`${booking?.patient?.admit?.pttype?.pttype}-${booking?.patient?.admit?.pttype?.name}`}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วอร์ด</Typography>
            <Typography>{`${booking?.patient?.admit?.ward?.ward}-${booking?.patient?.admit?.ward?.name}`}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วันที่ Admit</Typography>
            <Typography>{moment(booking?.patient?.admit?.regdate).format('DD/MM/YYYY')}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>เวลา</Typography>
            <Typography>{booking?.patient?.admit?.regtime}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>แพทย์ผู้ Admit</Typography>
            <Typography>{`${booking?.patient?.admit?.admdoctor?.code}-${booking?.patient?.admit?.admdoctor?.name}`}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>Pre Dx</Typography>
            <Typography>{booking?.patient?.admit?.prediag}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วันที่จองห้องพิเศษ</Typography>
            <Typography>{moment(booking.book_date).format('DD/MM/YYYY')}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>เวลา</Typography>
            <Typography>{moment(booking.created_at).format('H:mm')}</Typography>
            <Divider style={{ marginTop: '10px' }} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>ผู้จองห้องพิเศษ</Typography>
            <Typography>{booking.book_name}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>เบอร์ติดต่อ</Typography>
            <Typography>{booking.book_tel}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

IpInfo.propTypes = {
  booking: PropTypes.object
};

export default IpInfo;
