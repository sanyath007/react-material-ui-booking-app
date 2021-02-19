import React from 'react';
import { Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Fullcalendar from '../Fullcalendar';
import useStyles from './styles';

const events = [
  { title: 'event 1', date: '2021-02-01' },
  { title: 'event 2', date: '2021-02-02' },
];

function CalendarView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Calendar"
    >
      <Container maxWidth={false} style={{ backgroundColor: 'white' }}>
        <Box>
          <Fullcalendar data={events} />
        </Box>
      </Container>
    </Page>
  );
}

export default CalendarView;
