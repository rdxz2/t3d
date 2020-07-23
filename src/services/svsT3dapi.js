import { message } from 'antd';

import CONTENTTYPE from '../constants/CONTENTTYPE';
import HTTPMETHOD, { HTTPMETHODS_WITHOUTBODY } from '../constants/HTTPMETHOD';
import HTTPSTATUS from '../constants/HTTPSTATUS';
import JWTKEY from '../constants/JWTKEY';
import { getJwt, getJwtInfo, isJwtExpired, removeJwt, setJwt } from '../utilities/utlJwt';
import { sendHttpRequest } from './svsBase';

class SvsT3dapi {
  // constructor
  constructor() {
    // set t3dapi domain name
    this._domain = process.env.REACT_APP_DOMAIN_T3DAPI;
  }

  // main request sender
  sendRequest = async (endpoint, method, body = {}, { additionalHeaders = {}, jwtKey = JWTKEY.T3DAPI, isLoggingIn = false } = {}) => {
    // START -- CREATE REQUEST HEADERS

    // check if request is multipart form data
    const isFormData = additionalHeaders['Content-Type'] === CONTENTTYPE.FORMDATA;

    // construct request headers
    const headers = { 'Content-Type': CONTENTTYPE.JSON, ...additionalHeaders };

    // no need to specify content type for form data request
    if (isFormData) delete headers['Content-Type'];

    // add authorization header
    const jwt = getJwt(jwtKey);
    if (jwt) headers.Authorization = `Bearer ${jwt}`;

    // END -- CREATE REQUEST HEADERS

    // START -- CREATE REQUEST BODY

    let bodyToSend;

    // strip body for http methods without body (get, delete, etc.)
    if (HTTPMETHODS_WITHOUTBODY.includes(method)) bodyToSend = undefined;
    // just send the original specified body for form data
    else if (isFormData) bodyToSend = body;
    // make json for other request
    else bodyToSend = JSON.stringify(body);

    // END -- CREATE REQUEST BODY

    try {
      // if current jwt is expired then request for new jwt
      if (this.isApiJwtExpired() && !isLoggingIn) {
        // get refresh token from local storage
        const refreshToken = this.getApiRefreshToken();

        // request for new token (via refresh token)
        const responseNewToken = await sendHttpRequest(`${this._domain}/api/authentication/refresh`, HTTPMETHOD.POST, { refreshToken: refreshToken });

        // set the newly obtained jwt
        this.setApiJwt(responseNewToken.data.token);
      }

      // send request
      const response = await sendHttpRequest(`${this._domain}/${endpoint}`, method, bodyToSend, headers);

      // if ok then just pass the response
      if (response.status === HTTPSTATUS.OK) return response;

      // translate response error status
      switch (response.status) {
        // bad request, not found
        case HTTPSTATUS.BADREQUEST:
        case HTTPSTATUS.NOTFOUND:
          // show error message
          message.error(response.data);

          break;
        // unauthorized
        case HTTPSTATUS.UNAUTHORIZED:
          // // remove token from local storage
          // this.removeApiJwt();

          // // remove refresh token from local storage
          // this.removeApiRefreshToken();

          // alert('REDIRECTING');

          // redirect to login page
          window.location.replace('/login?reason=Unauthorized');

          break;
        // server error
        case HTTPSTATUS.SERVERERROR:
          // show error message
          message.error('there are server error');

          break;
        // others
        default:
          message.error('error');
          break;
      }

      // throw error
      throw response;
    } catch (error) {
      throw error;
    }
  };

  // send request for dropdown
  sendRequestSelectList = async (endpoint, { show = 10, search = '', requireds = {}, alreadies = [] } = {}) => {
    try {
      // send request
      const response = await this.sendRequest(`api/selectlist/${endpoint}`, HTTPMETHOD.POST, { show, search, requireds, alreadies });

      return response;
    } catch (error) {
      throw error;
    }
  };

  // START -- API JWT FUNCTIONALITY

  // set jwt for this api
  setApiJwt = (jwt) => setJwt(JWTKEY.T3DAPI, jwt);

  // get jwt for this api
  getApiJwt = () => getJwt(JWTKEY.T3DAPI);

  // remove jwt for this api
  removeApiJwt = () => removeJwt(JWTKEY.T3DAPI);

  // get jwt info for this api
  getApiJwtInfo = () => getJwtInfo(this.getApiJwt());

  // check if api jwt is expired
  isApiJwtExpired = () => isJwtExpired(JWTKEY.T3DAPI);

  // END -- API JWT FUNCTIONALITY

  // START -- API REFRESH TOKEN FUNCTIONALITY

  // set refresh token for this api
  setApiRefreshToken = (refreshToken) => setJwt(JWTKEY.T3DAPI_REFRESHTOKEN, refreshToken);

  // get refresh token for this api
  getApiRefreshToken = () => getJwt(JWTKEY.T3DAPI_REFRESHTOKEN);

  // remove refresh token for this api
  removeApiRefreshToken = () => removeJwt(JWTKEY.T3DAPI_REFRESHTOKEN);

  // END -- API REFRESH TOKEN FUNCTIONALITY
}

export default SvsT3dapi;
