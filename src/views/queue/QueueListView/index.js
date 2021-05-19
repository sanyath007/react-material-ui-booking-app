import React from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import withAuth from 'src/components/withAuth';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import useStyles from './styles';
import DepartCard from './DepartCard';

const departs = [
  { no: 1, name: 'อายุรกรรม' },
  { no: 2, name: 'พระภิกษุสงฆ์' },
  { no: 3, name: 'ศัลย์กรรมและออร์โธปิดิกส์' },
  { no: 4, name: 'สูติ-นรีเวชกรรม และ กุมารเวชกรรม' },
  { no: 5, name: 'โสต ศอ นาสิก' },
  { no: 6, name: 'จนท.รพ.' },
];

const QueueListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="รายการจองห้องพิเศษ">
      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>

          {departs && departs.map((dep) => <DepartCard depart={dep} key={dep.no} />)}

        </Box>
      </Container>
    </Page>
  );
};

export default withAuth(QueueListView);
