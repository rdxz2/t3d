import './toDoLine.css';

import { StarTwoTone } from '@ant-design/icons';
import { Checkbox, message, Space, Tag } from 'antd';
import React from 'react';

import COLOR from '../../../constants/COLOR';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';
import { makeEllipsis } from '../../../utilities/utlType';
import { SELECTOPTION } from '../../../constants/SELECTOPTIONS';

const ToDoLine = ({ toDo, handleModalToDoOpen }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // loading state
  const [isLoading, isLoadingSet] = React.useState(false);

  // important stat
  const [isImportant, isImportantSet] = React.useState(toDo.is_important ?? false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle to do completed
  const handleToggleToDoCompleted = async (event) => {
    // loading...
    isLoadingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/complete/${toDo._id}?is_completed=${event.target.checked}`, HTTPMETHOD.GET);

      // show error message if response is not the same as expected important state
      if (event.target.checked !== response.data.is_completed) return message.error('data error');

      // convert to ellispis string
      const toDoDescription = makeEllipsis(toDo.description);

      // show message
      if (response.data.is_completed) message.success(`'${toDoDescription}' completed`);
      else message.info(`'${toDoDescription}' is opened again`);
    } catch (error) {
    } finally {
      // not loading...
      isLoadingSet(false);
    }
  };

  // toggle to do important
  const handleToggleToDoImportant = async () => {
    // loading...
    isLoadingSet(true);

    // get important flag
    const _isImportant = isImportant;

    // toggle important flag
    const isImportantToggled = !_isImportant;

    // set state
    isImportantSet(isImportantToggled);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/important/${toDo._id}?is_important=${isImportantToggled}`, HTTPMETHOD.GET);

      // show error message if response is not the same as expected important state
      if (isImportantToggled !== response.data.is_important) return message.error('data error');

      // show message
      if (response.data.is_important) message.success(`'${toDo.description}' is marked important`);
      else message.info(`'${toDo.description}' is marked not important`);
    } catch (error) {
    } finally {
      // not loading...
      isLoadingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  const selecOptionToDoPriority = SELECTOPTION.TODO_PRIORITY[toDo.priority];

  return (
    <Space style={{ width: '100%' }}>
      {/* completed checkbox */}
      <Checkbox disabled={isLoading} defaultChecked={toDo.is_completed} onChange={handleToggleToDoCompleted}></Checkbox>
      {/* important flag */}
      <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleToDoImportant}></StarTwoTone>
      {/* priority tag (only if priority is not normal (4)) */}
      {toDo.priority !== 4 && <Tag color={selecOptionToDoPriority.tagColor}>{selecOptionToDoPriority.text}</Tag>}
      {/* description */}
      <span className='todo-description' onClick={() => handleModalToDoOpen(toDo._id)}>
        {toDo.description}
      </span>
    </Space>
  );
};

export default ToDoLine;
