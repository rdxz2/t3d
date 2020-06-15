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
  sendRequest = async (endpoint, method, body = {}, { additionalHeaders = {}, jwtKey = JWTKEY.T3DAPI } = {}) => {
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
          // remove token from local storage
          this.removeApiJwt();

          // show warning message
          message.warning('please log in again');

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
}

export default SvsT3dapi;
