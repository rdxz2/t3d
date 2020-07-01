import { DatePicker, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import TIMEFORMAT from '../../../constants/TIMEFORMAT';
import CtxApi from '../../../contexts/ctxApi';

const SelectedTodoReminder = ({ todo = {} }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // reminder date
  const [remindDate, remindDateSet] = React.useState();
  const [isChangingReminderFromProp, isChangingReminderFromPropSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // change reminder
  const handleChangeReminder = async (value) => {
    // set remind date
    remindDateSet(value);

    try {
      // send request
      await svsT3dapi.sendRequest(`api/todo/reminder/${todo.id}?is_removing=${!value}&remind_date=${(value && encodeURIComponent(value.format())) || ''}`, HTTPMETHOD.GET);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change reminder from prop on initialization
    if (isChangingReminderFromProp && todo.remind_date) {
      remindDateSet(moment(todo.remind_date));

      isChangingReminderFromPropSet(false);
    }
  }, [isChangingReminderFromProp, todo.remind_date]);

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={4}>Reminder</Typography.Title>
      {/* reminder date picker */}
      <DatePicker showTime={{ format: 'HH:mm' }} value={remindDate} format={TIMEFORMAT.DDMMMYYHHMM} onChange={handleChangeReminder}></DatePicker>
    </>
  );
};

export default SelectedTodoReminder;
