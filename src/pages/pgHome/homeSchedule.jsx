import { Calendar, Typography, Tag, Badge } from 'antd';
import React from 'react';
import moment from 'moment';
import SELECTOPTIONS, { SELECTOPTION } from '../../constants/SELECTOPTIONS';
import { StarTwoTone } from '@ant-design/icons';
import './homeSchedule.css';
import COLOR from '../../constants/COLOR';

const HomeSchedule = ({ schedules = [], onMonthChanged }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // render date cell
  const renderDateCell = (date) => {
    // get schedule for this date
    const currentDateSchedules = schedules.filter((schedule) => moment(schedule.date).date() === date.date());

    // render the schedules
    return (
      <ul className='schedule-calendar-list'>
        {currentDateSchedules.map((schedule, scheduleIndex) => {
          // get to do priority
          const selectOptionTodoPriority = SELECTOPTION.TODO_PRIORITY[schedule.priority];

          // render
          return (
            <li key={scheduleIndex}>
              <Badge
                status='warning'
                text={
                  <>
                    {schedule.is_important && <StarTwoTone twoToneColor={COLOR.YELLOW}></StarTwoTone>}{' '}
                    {schedule.priority !== SELECTOPTIONS.UNRENDERED_TODO_PRIORIT && selectOptionTodoPriority && <Tag color={selectOptionTodoPriority.todoColor}>{selectOptionTodoPriority.text}</Tag>} {schedule.description}
                  </>
                }></Badge>
            </li>
          );
        })}
      </ul>
    );
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      <Typography.Title level={3}>Schedule</Typography.Title>
      <Calendar onPanelChange={onMonthChanged} dateCellRender={renderDateCell}></Calendar>
    </>
  );
};

export default HomeSchedule;
