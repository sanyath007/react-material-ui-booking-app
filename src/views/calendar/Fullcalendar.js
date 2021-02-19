import React from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Fullcalendar({ data }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={data}
      locale="th"
    />
  );
}

Fullcalendar.propTypes = {
  data: PropTypes.array
};

export default Fullcalendar;
