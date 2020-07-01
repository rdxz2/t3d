import CONTENTTYPE from '../constants/CONTENTTYPE';
import { HTTPMETHODS_WITHOUTBODY } from '../constants/HTTPMETHOD';
import JWTKEY from '../constants/JWTKEY';
import { getJwt } from '../utilities/utlJwt';

// send http request (fetch)
export const sendHttpRequest = async (url, method, body = {}, { additionalHeaders = {}, jwtKey = JWTKEY.T3DAPI } = {}) => {
  // construct request headers
  let headers = {
    'Content-Type': CONTENTTYPE.JSON,
    ...additionalHeaders,
  };

  // add authorization header
  const jwt = getJwt(jwtKey);
  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  try {
    // send request
    const response = await fetch(url, {
      method: method,
      body: HTTPMETHODS_WITHOUTBODY.includes(method) ? undefined : JSON.stringify(body),
      headers: headers,
    });

    // translate json string to object
    const responseJson = await response.json();

    // set http status to be evaluated by the corresponding caller
    responseJson.status = response.status;

    // return server response
    return responseJson;
  } catch (error) {
    console.error('got error from http request', error);
    throw error;
  }
};
