import React from 'react';
import CtxApi from '../../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Checkbox, message } from 'antd';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';

const ToDoLine = ({ toDo }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // loading state
  const [isLoading, isLoadingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle to do completed
  const handleToggleToDoCompleted = async (event) => {
    // loading...
    isLoadingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/complete/${toDo._id}?is_completed=${event.target.checked}`, HTTPMETHOD.GET);

      // show message
      if (response.data.is_completed) message.success(`'${toDo.description}' completed`);
      else message.info(`'${toDo.description}' is opened again`);
    } catch (error) {
    } finally {
      // not loading...
      isLoadingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Checkbox defaultChecked={toDo.is_completed} onChange={handleToggleToDoCompleted}>
      {toDo.description}
    </Checkbox>
  );
};

export default ToDoLine;
