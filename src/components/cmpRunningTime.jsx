import React from 'react';
import moment from 'moment';
import './cmpRunningTime.css';
import PropTypes from 'prop-types';
import TIMEFORMAT from '../constants/TIMEFORMAT';

const CmpRunningTime = ({ isBold = false, time, format = TIMEFORMAT.DDMMMMYYYYHHMMSS }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- STATES

  // current running time (based on 'time' parameter)
  const [_time, _timeSet] = React.useState(time ? moment(time) : moment());

  // END -- STATES

  // START -- EFFECTS

  React.useEffect(() => {
    // set 1 second interval
    const timeInterval = setInterval(() => tick(), 1000);

    return () => {
      // clear 1 second interval on dispose
      clearInterval(timeInterval);
    };
  }, []);

  // END -- EFFECTS

  // START -- FUNCTIONS

  // add 1 second to current time
  const tick = () => {
    _timeSet((__time) => moment(__time).add(1, 'seconds'));
  };

  // END -- FUNCTIONS

  return (
    <span className='running-time' style={{ fontWeight: isBold ? 'bold' : null }}>
      {_time.format(format)}
    </span>
  );
};

CmpRunningTime.propTypes = {
  isBold: PropTypes.bool,
  format: PropTypes.string,
};

export default CmpRunningTime;
