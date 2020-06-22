import TIMEFORMAT from '../constants/TIMEFORMAT';
import moment from 'moment';

// START -- OBJECT

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

  const queries = [];

  // construct query string
  for (const key in input) queries.push(`${key}=${input[key]}`);

  // join with '&'
  return `?${queries.join('&')}`;
};

// convert object to array of key-value pair (object must be flat)
export const convertObjectToKeyValueArray = (input) => {
  const keyValuePairs = [];

  // construct key-value pairs
  for (const key in input) keyValuePairs.push({ value: key, text: input[key] });

  return keyValuePairs;
};

// END -- OBJECT

// START -- ARRAY

// check if input is an array
export const isArray = (inputs) => Array.isArray(inputs);

// check if input is an empty array
export const isEmptyArray = (inputs) => !isArray(inputs) || !inputs.length;

// END -- ARRAY

// START -- COLLECTION

// convert collection to object by the specified fields
export const convertCollectionToObject = (inputs, keyField = '', fields = []) => {
  // do not do anything if fields is empty
  if (!keyField) return {};

  const object = {};

  const isDesiredFieldsEmpty = isEmptyArray(fields);

  inputs.forEach((input) => {
    // get object key in collection element
    const objectKey = input[keyField];

    // create child object for this object key
    const childObject = {};

    // list of collection element properties of not specified by user
    const inputProperties = isDesiredFieldsEmpty ? Object.keys(input).filter((key) => key !== keyField) : fields;

    inputProperties.forEach((inputProperty) => (childObject[inputProperty] = input[inputProperty]));

    // assign object key and its child
    object[objectKey] = childObject;
  });

  return object;
};

// ENd -- COLLECTION

// START  -- STRING

// create an ellipsis effect if input string is longer than desired max length
export const makeEllipsis = (input, maxLength = 20) => (input.length > maxLength ? `${input.slice(0, 20)}...` : input);

// convert iso date to readable format
export const convertIsoDateToMoment = (input, format = TIMEFORMAT.DDMMMMYYYYHHMMSS) => (input ? moment(input).format(format) : '-');

// END -- STRING

// START  -- NUMBER

// END -- NUMBER
