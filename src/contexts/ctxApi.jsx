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
    registerJoined: (onJoined = (response) => {}) => {},
    unregisterJoined: () => {},
    registerLeaved: (onLeaved = (response) => {}) => {},
    unregisterLeaved: () => {},
    registerTodoCreated: (onTodoCreated = (response) => {}) => {},
    unregisterTodoCreated: () => {},
    registerTodoCompleteToggled: (onTodoCompleteToggled = (response) => {}) => {},
    unregisterTodoCompleteToggled: () => {},
    registerTodoImportantToggled: (onTodoImportantToggled = (response) => {}) => {},
    unregisterTodoImportantToggled: () => {},
    registerTodoTagCreated: (onTodoTagCreated = (response) => {}) => {},
    unregisterTodoTagCreated: () => {},
    registerTodoTagDeleted: (onTodoTagDeleted = (response) => {}) => {},
    unregisterTodoTagDeleted: () => {},
    registerTodoDescriptionEdited: (onTodoDescriptionEdited = (response) => {}) => {},
    unregisterTodoDescriptionEdited: () => {},
    registerTodoDetailEdited: (onTodoDetailEdited = (response) => {}) => {},
    unregisterTodoDetailEdited: () => {},
    registerTodoPriorityEdited: (onTodoPriorityEdited = (response) => {}) => {},
    unregisterTodoPriorityEdited: () => {},
    registerTodoCommented: (onTodoCommented = (response) => {}) => {},
    unregisterTodoCommented: () => {},
    registerTodoWorkDateEdited: (onTodoWorkDateEdited = (response) => {}) => {},
    unregisterTodoWorkDateEdited: () => {},

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
    emitTodoWorkDateEditing: (data = { projectCode: '', comment: {}, activity: {} }, callback = (error, data) => {}) => {},
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
