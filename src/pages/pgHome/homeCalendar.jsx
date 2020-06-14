import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Calendar, Typography } from 'antd';

const HomeCalendar = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // render date cell
  // will show activities in that date
  const renderDateCell = (value) => {
    // console.log('render date cell', value);
  };

  // render month cell
  // will show how many activities in that month
  const renderMonthCell = (value) => {
    console.log('render month cell', value);
  };

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
