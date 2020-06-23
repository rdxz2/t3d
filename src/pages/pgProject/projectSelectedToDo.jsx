import { Divider, Modal, Space, Spin, Typography } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import SelectedToDoDescription from './projectSelectedToDo/selectedToDoDescription';
import SelectedToDoPriority from './projectSelectedToDo/selectedToDoPriority';
import SelectedToDoTags from './projectSelectedToDo/selectedToDoTags';

const ProjectSelectedToDo = ({ match, history, handleDescriptionChanged, handlePriorityChanged }) => {
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
            <SelectedToDoDescription toDo={toDo} handleDescriptionChanged={handleDescriptionChanged}></SelectedToDoDescription>
          </Space>
          {/* tags */}
          <SelectedToDoTags toDo={toDo}></SelectedToDoTags>
          {/* priority */}
          <SelectedToDoPriority toDo={toDo} toDoSet={toDoSet} handlePriorityChanged={handlePriorityChanged}></SelectedToDoPriority>
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
