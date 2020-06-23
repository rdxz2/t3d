import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';

const SelectedToDoDescription = ({ toDo = {}, handleDescriptionChanged }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // value
  const [description, descriptionSet] = React.useState('');

  // editing state
  const [isEditingDescription, isEditingDescriptionSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle editing on/off
  const handleEditDescriptionOpen = () => isEditingDescriptionSet(true);
  const handleEditDescriptionClose = () => isEditingDescriptionSet(false);

  // editing description
  const handleChangeDescription = (event) => descriptionSet(event.target.value);

  // submit: edit description
  const handleSubmitEditDescription = async () => {
    // do not do anything if description is empty
    if (!description) return;

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/description/${toDo.id}`, HTTPMETHOD.POST, { description });

      // run callback
      handleDescriptionChanged(toDo.id, response.data.description);

      // close this
      handleEditDescriptionClose();
    } catch (error) {
    } finally {
    }
  };

  // description key down
  const handleDescriptionKeyDown = (event) => {
    // close this form on esc
    if (event.key === 'Escape') handleEditDescriptionClose();
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // set description value
  React.useEffect(() => {
    descriptionSet(toDo.description);
  }, [toDo.description]);

  // END -- EFFECTS

  return (
    <>
      {isEditingDescription ? (
        <Input autoFocus name='description' value={description} onChange={handleChangeDescription} onPressEnter={handleSubmitEditDescription} onBlur={handleEditDescriptionClose} onKeyDown={handleDescriptionKeyDown}></Input>
      ) : (
        <Typography.Text strong>
          {description} <Button type='link' icon={<EditOutlined></EditOutlined>} onClick={handleEditDescriptionOpen}></Button>
        </Typography.Text>
      )}
    </>
  );
};

export default SelectedToDoDescription;
