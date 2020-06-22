import { Divider, Modal, Select, Space, Spin, Typography } from 'antd';
import React from 'react';

import CmpTags from '../../components/cmpTags';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import SELECTOPTIONS from '../../constants/SELECTOPTIONS';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';

const ProjectSelectedToDo = ({ match, history, handlePriorityChanged }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // loading state
  const [isLoading, isLoadingSet] = React.useState(false);

  // to do
  const [toDo, toDoSet] = React.useState({});

  // modal visible state
  const [isModalVisible, isModalVisibleSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // send request (to do detail)
    const responseToDoDetail = await svsT3dapi.sendRequest(`api/todo/detail/${match.params.id}`, HTTPMETHOD.GET);

    // set to do detail
    toDoSet(responseToDoDetail.data);

    // not loading...
    isLoadingSet(false);
  }, [match.params.id, svsT3dapi]);

  // close modal
  const handleCloseModal = () => isModalVisibleSet(false);
  const handleRedirectToBefore = () => history.goBack();

  // tags changed
  const handleTagsChanged = async (tags) => {
    try {
      // send request
      await svsT3dapi.sendRequest(`api/todo/tags/${match.params.id}`, HTTPMETHOD.POST, { tags });
    } catch (error) {}
  };

  // change priority
  const handleChangePriority = async (priorityLevel) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/priority/${match.params.id}?priorityLevel=${priorityLevel}`, HTTPMETHOD.GET);

      // trigger changed priority to caller
      handlePriorityChanged(match.params.id, response.data.priority);

      // set to dos
      toDoSet((_toDo) => ({ ..._toDo, priority: response.data.priority }));
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  // END -- EFFECTS

  return (
    <Modal destroyOnClose footer={null} visible={isModalVisible} onCancel={handleCloseModal} afterClose={handleRedirectToBefore}>
      {/* spinner */}
      <Spin spinning={isLoading}>
        <Space direction='vertical'>
          {/* main to do informations */}
          <Space>
            {/* completed checkbox */}
            {/* <Checkbox defaultChecked={toDo.is_completed} onChange={handleToggleToDoCompleted}></Checkbox> */}
            {/* important flag */}
            {/* <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleToDoImportant}></StarTwoTone> */}
            {/* description */}
            <Typography.Text
              editable={{
                onChange: (value) => {
                  console.log('edit desc:', value);
                },
              }}>
              {toDo.description}
            </Typography.Text>
          </Space>
          {/* tags */}
          <CmpTags initialValue={toDo.tags} onChange={handleTagsChanged}></CmpTags>
          {/* priority */}
          <Select name='priority' value={toDo.priority} onChange={handleChangePriority} style={{ minWidth: 100 }}>
            {SELECTOPTIONS.TODO_PRIORITY.map((priority, priorityIndex) => (
              <Select.Option key={priorityIndex} value={priority.value}>
                {priority.text}
              </Select.Option>
            ))}
          </Select>
          {/* meta */}
          <Divider style={{ marginTop: 16, marginBottom: 16 }}></Divider>
          <Typography.Text>
            Created on <b>{convertIsoDateToMoment(toDo.create_date)}</b> by <b>{toDo.creatorName}</b>
          </Typography.Text>
          <Typography.Text>
            Last updated on <b>{convertIsoDateToMoment(toDo.update_date)}</b>
          </Typography.Text>
        </Space>
      </Spin>
    </Modal>
  );
};

export default ProjectSelectedToDo;
