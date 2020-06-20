import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';

const ToDoCreate = ({ projectCode, handleAfterCreated }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // form
  const [form] = Form.useForm();

  // END -- OTHERS

  // START -- STATES

  // creating state
  const [isCreatingToDo, isCreatingToDoSet] = React.useState(false);

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // handle open/close create to do form
  const handleCreateToDoOpen = () => isCreatingToDoSet(true);
  const handleCreateToDoClose = () => isCreatingToDoSet(false);

  // submit: create to do
  const handleSubmit = async (values) => {
    // do not do anything if description is empty
    if (!values.description) return;

    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.POST, values);

      // run callback
      handleAfterCreated(response);

      // close the form
      handleCreateToDoClose();

      // reset form
      form.resetFields();

      // show success message
      message.success('to do created');
    } catch (error) {
      // not submitting
      isSubmittingSet(false);
    }
  };

  // handle key press
  const handleKeyPres = (event) => {
    // close this form on esc
    if (event.key === 'Escape') handleCreateToDoClose(form.getFieldValue('description'));
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return isCreatingToDo ? (
    // create to do form
    <Form form={form} onFinish={handleSubmit}>
      {/* description */}
      <Form.Item name='description' style={{ marginBottom: 0 }}>
        <Input autoFocus placeholder='what to be done?' onKeyDown={handleKeyPres} style={{ width: '100%' }}></Input>
      </Form.Item>
    </Form>
  ) : (
    // add button
    <Button block type='primary' icon={<PlusOutlined></PlusOutlined>} onClick={handleCreateToDoOpen}></Button>
  );
};

export default ToDoCreate;
