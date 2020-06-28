import { Select, Typography } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import SELECTOPTIONS from '../../../constants/SELECTOPTIONS';
import CtxApi from '../../../contexts/ctxApi';

const SelectedTodoPriority = ({ todo = {}, todoSet, handlePriorityChanged }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // priority value
  const [priority, prioritySet] = React.useState(0);
  const [isChangingPriorityFromProp, isChangingPriorityFromPropSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // submit: change priority
  const handleChangePriority = async (priorityLevel) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/priority/${todo.id}?priorityLevel=${priorityLevel}`, HTTPMETHOD.GET);

      // trigger changed priority to caller
      handlePriorityChanged(response);

      // // set to dos
      // todoSet((_todo) => ({ ..._todo, priority: response.data.priority }));

      // set this state
      prioritySet(priorityLevel);
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change priority from prop on initialization
    if (isChangingPriorityFromProp && todo.priority) {
      prioritySet(todo.priority);

      isChangingPriorityFromPropSet(false);
    }
  }, [isChangingPriorityFromProp, todo.priority]);

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={4}>Priority</Typography.Title>
      {/* select list */}
      <Select name='priority' value={priority} onChange={handleChangePriority} style={{ minWidth: 100 }}>
        {SELECTOPTIONS.TODO_PRIORITY.map((priority, priorityIndex) => (
          <Select.Option key={priorityIndex} value={priority.value}>
            {priority.text}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default SelectedTodoPriority;
