import React from 'react';

import SvsT3dapi from '../services/svsT3dapi';

const CtxApi = React.createContext({
  svsT3dapi: {
    // http request functionality
    sendRequest: async (endpoint = '', httpmethod = '', data = {}, { additionalHeaders = {}, jwtKey = '' } = {}) => ({ version: 'v', data: {} }),
    sendRequestSelectList: async (endpoint = '', { show = 0, search = '' } = {}) => ({ version: 'v', data: {} }),
    // jwt functionality
    setApiJwt: (jwt) => null,
    getApiJwt: () => '',
    removeApiJwt: () => null,
    getApiJwtInfo: () => {},
    isApiJwtExpired: () => false,
    // refresh token functionality
    setApiRefreshToken: (refreshToken) => null,
    getApiRefreshToken: () => '',
    removeApiRefreshToken: () => null,
  },
});

export const CtxPvdApi = ({ children }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // apis
  const [svsT3dapi] = React.useState(new SvsT3dapi());

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return <CtxApi.Provider value={{ svsT3dapi }}>{children}</CtxApi.Provider>;
};

export default CtxApi;
