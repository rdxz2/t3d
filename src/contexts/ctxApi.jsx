import React from 'react';

import SvsT3dapi from '../services/svsT3dapi';
import StrmProject from '../streamers/strmProject';

const CtxApi = React.createContext({
  svsT3dapi: {
    // http request functionality
    sendRequest: async (endpoint = '', httpmethod = '', data = {}, { additionalHeaders = {}, jwtKey = '', isLoggingIn = false } = {}) => ({ version: 'v', data: {} }),
    sendRequestSelectList: async (endpoint = '', { show = 0, search = '' } = {}) => ({ version: 'v', data: {} }),
    // jwt functionality
    setApiJwt: (jwt) => {},
    getApiJwt: () => '',
    removeApiJwt: () => {},
    getApiJwtInfo: () => {},
    isApiJwtExpired: () => false,
    // refresh token functionality
    setApiRefreshToken: (refreshToken) => {},
    getApiRefreshToken: () => '',
    removeApiRefreshToken: () => {},
  },
  strmProject: {
    // listeners
    registerJoined: (onJoined = () => {}) => {},
    unregisterJoined: () => {},
    registerLeaved: (onLeaved = () => {}) => {},
    unregisterLeaved: () => {},
    registerTodoCreated: (onTodoCreated = () => {}) => {},
    unregisterTodoCreated: () => {},
    registerTodoCompleteToggled: (onTodoCompleteToggled = () => {}) => {},
    unregisterTodoCompleteToggled: () => {},
    registerTodoImportantToggled: (onTodoImportantToggled = () => {}) => {},
    unregisterTodoImportantToggled: () => {},
    registerTodoTagCreated: (onTodoTagCreated = () => {}) => {},
    unregisterTodoTagCreated: () => {},
    registerTodoTagDeleted: (onTodoTagDeleted = () => {}) => {},
    unregisterTodoTagDeleted: () => {},
    registerTodoDescriptionEdited: (onTodoDescriptionEdited = () => {}) => {},
    unregisterTodoDescriptionEdited: () => {},
    registerTodoDetailEdited: (onTodoDetailEdite = () => {}) => {},
    unregisterTodoDetailEdited: () => {},
    registerTodoPriorityEdited: (onTodoPriorityEdited = () => {}) => {},
    unregisterTodoPriorityEdited: () => {},
    registerTodoCommented: (onTodoCommented = () => {}) => {},
    unregisterTodoCommented: () => {},
    // emitters
    emitJoin: (data = { projectCode: '', id: '', name: '' }, callback = (error, data) => {}) => {},
    emitLeave: (projectCode = '', callback = (error, data) => {}) => {},
    emitTodoCreating: (data = { projectCode: '', todo: {}, activity: {} }, callback = (error, data) => {}) => {},
    emitTodoCompleteToggling: (data = { projectCode: '', todo: {}, activity: {} }, callback = (error, data) => {}) => {},
    emitTodoImportantToggling: (data = { projectCode: '', todo: {}, activity: {} }, callback = (error, data) => {}) => {},
    emitTodoTagCreating: (data = { projectCode: '', tag: '', activity: {} }, callback = (error, data) => {}) => {},
    emitTodoTagDeleted: (data = { projectCode: '', tag: '', activity: {} }, callback = (error, data) => {}) => {},
    emitTodoDescriptionEditing: (data = { projectCode: '', todo: {}, activity: {} }, callback = (error, data) => {}) => {},
    emitTodoDetailEditing: (data = { projectCode: '', todo: {}, activity: {} }, callback) => {},
    emitTodoPriorityEditing: (data = { projectCode: '', todo: {}, activity: {} }, callback = (error, data) => {}) => {},
    emitTodoCommenting: (data = { projectCode: '', comment: {}, activity: {} }, callback = (error, data) => {}) => {},
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
