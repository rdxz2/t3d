import { DatePicker, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import TIMEFORMAT from '../../../constants/TIMEFORMAT';
import CtxApi from '../../../contexts/ctxApi';

const THIS_WEEK_START = moment().startOf('isoWeeks');
const THIS_WEEK_END = moment().endOf('weeks');
const NEXT_WEEK = moment().add(1, 'weeks');
const NEXT_WEEK_START = moment(NEXT_WEEK).startOf('isoWeeks');
const NEXT_WEEK_END = moment(NEXT_WEEK).endOf('weeks');

const THIS_MONTH_START = moment().startOf('months');
const THIS_MONTH_END = moment().endOf('months');
const NEXT_MONTH = moment().add(1, 'months');
const NEXT_MONTH_START = moment(NEXT_MONTH).startOf('months');
const NEXT_MONTH_END = moment(NEXT_MONTH).endOf('months');

const DATE_RANGE = {
  'Ts. Week': [THIS_WEEK_START, THIS_WEEK_END],
  'Nx. Week (5)': [NEXT_WEEK_START, moment(NEXT_WEEK_START).add('4', 'days')],
  'Nx. Week (full)': [NEXT_WEEK_START, NEXT_WEEK_END],
  'Ts. Month': [THIS_MONTH_START, THIS_MONTH_END],
  'Nx. Month (half)': [NEXT_MONTH_START, moment(NEXT_MONTH_START).add('15', 'days')],
  'Nx. Month (full)': [NEXT_MONTH_START, NEXT_MONTH_END],
};

const SelectedTodoWorkDate = ({ todo = {} }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // work date
  const [workDate, workDateSet] = React.useState([null, null]);
  const [isChangingWorkDateFromProp, isChangingWorkDateFromPropSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // work date changed
  const handleChangeWorkDate = async (dateRange) => {
    // set date
    workDateSet(dateRange);

    try {
      const dateStart = dateRange[0];
      const dateEnd = dateRange[1];

      // send request
      await svsT3dapi.sendRequest(`api/todo/workdate/${todo.id}?&dateStart=${(dateStart && encodeURIComponent(dateStart.format())) || ''}&dateEnd=${(dateEnd && encodeURIComponent(dateEnd.format())) || ''}`, HTTPMETHOD.GET);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change work date from prop on initialization
    if (isChangingWorkDateFromProp && todo.dateStart && todo.dateEnd) {
      workDateSet([moment(todo.dateStart), moment(todo.dateEnd)]);

      isChangingWorkDateFromPropSet(false);
    }
  }, [isChangingWorkDateFromProp, todo.dateEnd, todo.dateStart]);

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={4}>Work Date</Typography.Title>
      {/* date range */}
      <DatePicker.RangePicker value={workDate} format={TIMEFORMAT.DDMMMYY} ranges={DATE_RANGE} onChange={handleChangeWorkDate}></DatePicker.RangePicker>
    </>
  );
};

export default SelectedTodoWorkDate;
