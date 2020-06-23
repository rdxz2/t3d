import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';

const TodoCreate = ({ projectCode, handleAfterCreated }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // creating state
  const [isCreatingTodo, isCreatingTodoSet] = React.useState(false);

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // handle open/close create to do form
  const handleCreateTodoOpen = () => isCreatingTodoSet(true);
  const handleCreateTodoClose = () => isCreatingTodoSet(false);

  // submit: create to do
  const handleSubmit = async (event) => {
    // get value
    const description = event.target.value;

    // do not do anything if description is empty
    if (!description) return;

    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.POST, { description });

      // run callback
      handleAfterCreated(response);

      // close the form
      handleCreateTodoClose();

      // show success message
      message.success('to do created');
    } catch (error) {
    } finally {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // handle key press
  const handleKeyDown = (event) => {
    // close this form on esc
    if (event.key === 'Escape') handleCreateTodoClose();
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return isCreatingTodo ? (
    // create to do form
    <Input autoFocus autoComplete='off' placeholder='what to be done?' onPressEnter={handleSubmit} onBlur={handleCreateTodoClose} onKeyDown={handleKeyDown} style={{ width: '100%' }}></Input>
  ) : (
    // add button
    <Button block type='primary' loading={isSubmitting} icon={<PlusOutlined></PlusOutlined>} onClick={handleCreateTodoOpen}></Button>
  );
};

export default TodoCreate;
