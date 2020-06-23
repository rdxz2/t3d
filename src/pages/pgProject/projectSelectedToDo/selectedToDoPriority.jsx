import { Select } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import SELECTOPTIONS from '../../../constants/SELECTOPTIONS';
import CtxApi from '../../../contexts/ctxApi';

const SelectedToDoPriority = ({ toDo, toDoSet, handlePriorityChanged }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // submit: change priority
  const handleChangePriority = async (priorityLevel) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/priority/${toDo.id}?priorityLevel=${priorityLevel}`, HTTPMETHOD.GET);

      // trigger changed priority to caller
      handlePriorityChanged(toDo.id, response.data.priority);

      // set to dos
      toDoSet((_toDo) => ({ ..._toDo, priority: response.data.priority }));
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Select name='priority' value={toDo.priority} onChange={handleChangePriority} style={{ minWidth: 100 }}>
      {SELECTOPTIONS.TODO_PRIORITY.map((priority, priorityIndex) => (
        <Select.Option key={priorityIndex} value={priority.value}>
          {priority.text}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectedToDoPriority;
