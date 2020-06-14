import React from 'react';

import SvsT3dapi from '../services/svsT3dapi';

const CtxApi = React.createContext({
  svsT3dapi: {
    sendRequest: async (endpoint = '', httpmethod = '', data = {}, { additionalHeaders = {}, jwtKey = '' } = {}) => ({ version: 'v', data: {} }),
    sendRequestSelectList: async (endpoint = '', { show = 0, search = '' } = {}) => ({ version: 'v', data: {} }),
    setApiJwt: (jwt) => null,
    getApiJwt: () => '',
    removeApiJwt: () => null,
    getApiJwtInfo: () => {},
    isApiJwtExpired: () => false,
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

  // // check token validity
  // React.useState(() => {
  //   // get token
  //   const jwt = svsT3dapi.getApiJwt();
  //   if (!jwt) {
  //     history.replace('/login');
  //     return;
  //   }

  //   // just check if token is valid
  //   svsT3dapi
  //     .sendRequest('api/authentication/check', HTTPMETHOD.GET)
  //     .then((response) => {})
  //     .catch((error) => {});
  // }, []);

  // END -- EFFECTS

  return <CtxApi.Provider value={{ svsT3dapi }}>{children}</CtxApi.Provider>;
};

export default CtxApi;
