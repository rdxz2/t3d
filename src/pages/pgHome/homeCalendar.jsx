import { Calendar, Typography } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';

const HomeCalendar = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // render date cell
  const renderDateCell = (value) => {
    // console.log('render date cell', value);
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    svsT3dapi
      .sendRequest('api/user/schedule', HTTPMETHOD.GET)
      .then((response) => ({}))
      .catch((error) => ({}));
  }, [svsT3dapi]);

  // END -- EFFECTS

  return (
    <>
      <Typography.Title level={3}>Schedule</Typography.Title>
      <Calendar mode='month' dateCellRender={renderDateCell}></Calendar>
    </>
  );
};

export default HomeCalendar;
