import { message } from 'antd';

import HTTPMETHOD from '../constants/HTTPMETHOD';
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

  // send normal request
  sendRequest = async (endpoint, method, body = {}, { additionalHeaders = {}, jwtKey = JWTKEY.T3DAPI, retryCount = 0 } = {}) => {
    try {
      // send request
      const response = await sendHttpRequest(`${this._domain}/${endpoint}`, method, body, { additionalHeaders, jwtKey });

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
          // just don't do anything if we already retrying the same request
          if (++retryCount <= 1) {
            // get refresh token from local storage
            const refreshToken = this.getApiRefreshToken();

            // request for new token (via refresh token)
            const responseNewToken = await this.sendRequest('api/authentication/refresh', HTTPMETHOD.POST, { refreshToken: refreshToken }, { retryCount });

            // set the newly obtained jwt
            this.setApiJwt(responseNewToken.data.token);

            // // set the newly obtained refresh token
            // this.setApiRefreshToken(responseNewToken.data.refreshToken);

            try {
              // resend this request
              return await this.sendRequest(endpoint, method, body, { additionalHeaders, jwtKey, retryCount });
            } catch {}
          }

          // remove token from local storage
          this.removeApiJwt();

          // remove refresh token from local storage
          this.removeApiRefreshToken();

          alert('REDIRECTING');

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
