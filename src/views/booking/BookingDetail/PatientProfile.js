import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  // Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  avatar: {
    height: 100,
    width: 100,
    marginBottom: '10px'
  },
  withBorder: {
    border: '1px solid red'
  },
  textMuted: {
    color: theme.palette.text.secondary
  }
}));

const PatientProfile = ({ patient }) => {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Avatar
              className={classes.avatar}
              src={
                patient?.sex === '1'
                  ? '/static/images/avatars/avatar_8.png'
                  : '/static/images/avatars/avatar_9.png'
              }
            />
            <Typography color="textPrimary" gutterBottom variant="h4">
              {`${patient?.pname}${patient?.fname} ${patient?.lname}`}
            </Typography>
            <Typography className={classes.textMuted}>{`HN. ${patient?.hn}`}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography color="textPrimary" gutterBottom variant="h4">
              ข้อมูลผู้ป่วย
            </Typography>
            <Grid container justify="space-between">
              <Grid item md={6}>
                <Typography className={classes.textMuted}>อายุ</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{patient?.sex}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>เพศ</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{patient?.sex === 1 ? 'ชาย' : 'หญิง'}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>วันเกิด</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{moment(patient?.birthday).format('DD/MM/YYYY')}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>ที่อยู่</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  {`${patient?.addrpart} ${patient?.address?.full_name}`}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>โทร</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{patient?.hometel}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>ผู้ติดต่อ</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{patient?.informname}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography className={classes.textMuted}>โทรผู้ติดต่อ</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>{patient?.informtel}</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Card className="mt-2">
        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography color="textPrimary" gutterBottom variant="h4">
              NOTE
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

PatientProfile.propTypes = {
  patient: PropTypes.object
};

export default PatientProfile;
