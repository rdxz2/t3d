import { Calendar, Typography } from 'antd';
import React from 'react';

const HomeCalendar = ({ schedules, schedulesSet }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // render date cell
  const renderDateCell = (value) => {};

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      <Typography.Title level={3}>Schedule</Typography.Title>
      <Calendar mode='month' dateCellRender={renderDateCell}></Calendar>
    </>
  );
};

export default HomeCalendar;
