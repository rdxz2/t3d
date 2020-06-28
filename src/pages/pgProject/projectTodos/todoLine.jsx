import './todoLine.css';

import { StarTwoTone } from '@ant-design/icons';
import { Checkbox, message, Space, Tag } from 'antd';
import React from 'react';

import COLOR from '../../../constants/COLOR';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';
import { makeEllipsis } from '../../../utilities/utlType';
import { SELECTOPTION } from '../../../constants/SELECTOPTIONS';

const TodoLine = ({ todo, handleTodoCompleteToggled, handleTodoImportantToggled, handleModalTodoOpen }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // important stat
  const [isImportant, isImportantSet] = React.useState(todo.is_important ?? false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle to do completed
  const handleToggleTodoCompleted = async (event) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/complete/${todo.id}?is_completed=${event.target.checked}`, HTTPMETHOD.GET);

      // show error message if response is not the same as expected important state
      if (event.target.checked !== response.data.todo.is_completed) return message.error('data error');

      // make ellipsis description
      const todoDescription = makeEllipsis(todo.description);

      // show message
      if (response.data.todo.is_completed) message.success(`'${todoDescription}' completed`);
      else message.info(`'${todoDescription}' is opened again`);

      // run callback
      handleTodoCompleteToggled(response);
    } catch (error) {}
  };

  // toggle to do important
  const handleToggleTodoImportant = async () => {
    // get important flag
    const _isImportant = isImportant;

    // toggle important flag
    const isImportantToggled = !_isImportant;

    // set important flag
    isImportantSet(isImportantToggled);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/important/${todo.id}?is_important=${isImportantToggled}`, HTTPMETHOD.GET);

      // show error message if response is not the same as expected important state
      if (isImportantToggled !== response.data.todo.is_important) return message.error('data error');

      // make ellipsis description
      const todoDescription = makeEllipsis(todo.description);

      // show message
      if (response.data.todo.is_important) message.success(`'${todoDescription}' is marked important`);
      else message.info(`'${todoDescription}' is marked not important`);

      // run callback
      handleTodoImportantToggled(response);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  const selectOptionTodoPriority = SELECTOPTION.TODO_PRIORITY[todo.priority];

  return (
    <Space style={{ width: '100%' }}>
      {/* completed checkbox */}
      <Checkbox defaultChecked={todo.is_completed} onChange={handleToggleTodoCompleted}></Checkbox>
      {/* important flag */}
      <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleTodoImportant}></StarTwoTone>
      {/* priority tag (only if priority is not normal (4)) */}
      {todo.priority !== 4 && selectOptionTodoPriority && <Tag color={selectOptionTodoPriority.tagColor}>{selectOptionTodoPriority.text}</Tag>}
      {/* description */}
      <span className='todo-description' onClick={() => handleModalTodoOpen(todo.id)}>
        {todo.description}
      </span>
    </Space>
  );
};

export default TodoLine;
