import React from 'react';

import CmpTags from '../../../components/cmpTags';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';
import { Typography } from 'antd';

const SelectedTodoTags = ({ todo = {}, handleTagCreated: handleCallerTagCreated, handleTagDeleted: handleCallerTagDeleted }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // submit: tag created
  const handleTagCreated = async (tag) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/tag/${todo.id}?tag=${tag}`, HTTPMETHOD.GET);

      // runn callback
      handleCallerTagCreated(response);
    } catch (error) {}
  };

  // submit: tag deleted
  const handleTagDeleted = async (tag) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/tag/${todo.id}?tag=${tag}`, HTTPMETHOD.DELETE);

      handleCallerTagDeleted(response);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={4}>Tags</Typography.Title>
      {/* tags */}
      <CmpTags initialValue={todo.tags} onCreated={handleTagCreated} onDeleted={handleTagDeleted}></CmpTags>
    </>
  );
};

export default SelectedTodoTags;
