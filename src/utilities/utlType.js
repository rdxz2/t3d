import TIMEFORMAT from '../constants/TIMEFORMAT';
import moment from 'moment';

// check if input is an object
export const isObject = (input) => typeof input === 'object';

// check if input is not an empty object
export const isEmptyObject = (input) => {
  for (const key in input) if (input.hasOwnProperty(key)) return false;

  return true;
};

// convert object to query string
export const convertObjectToQueryString = (input) => {
  if (isEmptyObject(input)) return '';

  let queries = [];

  // construct query string
  for (const key in input) queries.push(`${key}=${input[key]}`);

  // join with '&'
  return `?${queries.join('&')}`;
};

// check if input is an array
export const isArray = (input) => Array.isArray(input);

// check if input is an empty array
export const isEmptyArray = (input) => !isArray(input) || !input.length;

export const convertIsoDateToMoment = (input, format = TIMEFORMAT.DDMMMMYYYYHHMMSS) => (input ? moment(input).format(format) : '');
