import React from 'react';

import SvsT3dapi from '../services/svsT3dapi';
import StrmProject from '../streamers/strmProject';

const CtxApi = React.createContext({
  svsT3dapi: {
    // http request functionality
    sendRequest: async (endpoint = '', httpmethod = '', data = {}, { additionalHeaders = {}, jwtKey = '', isLoggingIn = false } = {}) => ({ version: 'v', data: {} }),
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
  strmProject: {
    registerJoined: (onJoined = () => {}) => null,
    unregisterJoined: () => null,
    registerLeaved: (onLeaved = () => {}) => null,
    unregisterLeaved: () => null,
    registerTodoCreated: (onTodoCreated = () => {}) => null,
    unregisterTodoCreated: () => null,
    emitJoin: (data = { projectCode: '', id: '', name: '' }, callback = (error, data) => {}) => null,
    emitLeave: (projectCode = '', callback = (error, data) => {}) => null,
    emitTodoCreating: (data = { projectCode: '', id: '', description: '', priority: 0 }, callback = (error, data) => {}) => null,
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

  // project streamer
  const [strmProject] = React.useState(new StrmProject());

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return <CtxApi.Provider value={{ svsT3dapi, strmProject }}>{children}</CtxApi.Provider>;
};

export default CtxApi;
