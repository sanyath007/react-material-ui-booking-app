import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Card,
  CardContent,
  // Divider,
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

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>AN</Typography>
            <Typography>{booking?.ip?.an}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>HN</Typography>
            <Typography>{booking?.ip?.hn}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>สิทธิการรักษา</Typography>
            <Typography>{`${booking?.ip?.pttype?.pttype}-${booking?.ip?.pttype?.name}`}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วอร์ด</Typography>
            <Typography>{`${booking?.ip?.ward?.ward}-${booking?.ip?.ward?.name}`}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วันที่ Admit</Typography>
            <Typography>{moment(booking?.ip?.regdate).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>เวลา</Typography>
            <Typography>{booking?.ip?.regtime}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>แพทย์ผู้ Admit</Typography>
            <Typography>{`${booking?.ip?.admdoctor?.code}-${booking?.ip?.admdoctor?.name}`}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>Pre Dx</Typography>
            <Typography>{booking?.ip?.prediag}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>วันที่จองห้องพิเศษ</Typography>
            <Typography>{moment(booking.book_date).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="subtitle2" className={classes.textMuted}>เวลา</Typography>
            <Typography>{moment(booking.created_at).format('H:mm')}</Typography>
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
