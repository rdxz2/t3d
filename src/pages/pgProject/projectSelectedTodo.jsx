import { Divider, Modal, Space, Spin, Typography } from 'antd';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import SelectedTodoDescription from './projectSelectedTodo/selectedTodoDescription';
import SelectedTodoPriority from './projectSelectedTodo/selectedTodoPriority';
import SelectedTodoTags from './projectSelectedTodo/selectedTodoTags';

const ProjectSelectedTodo = ({ match, history, handleDescriptionEdited, handlePriorityChanged, handleTagCreated, handleTagDeleted }) => {
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
  const [todo, todoSet] = React.useState({});

  // modal visible state
  const [isModalVisible, isModalVisibleSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // send request (to do detail)
    const responseTodoDetail = await svsT3dapi.sendRequest(`api/todo/detail/${match.params.id}`, HTTPMETHOD.GET);

    // set to do detail
    todoSet(responseTodoDetail.data);

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
            {/* <Checkbox defaultChecked={todo.is_completed} onChange={handleToggleTodoCompleted}></Checkbox> */}
            {/* important flag */}
            {/* <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleTodoImportant}></StarTwoTone> */}
            {/* description */}
            <SelectedTodoDescription todo={todo} handleDescriptionEdited={handleDescriptionEdited}></SelectedTodoDescription>
          </Space>
          {/* tags */}
          <SelectedTodoTags todo={todo} handleTagCreated={handleTagCreated} handleTagDeleted={handleTagDeleted}></SelectedTodoTags>
          {/* priority */}
          <SelectedTodoPriority todo={todo} todoSet={todoSet} handlePriorityChanged={handlePriorityChanged}></SelectedTodoPriority>
          {/* meta */}
          <Divider></Divider>
          <Typography.Text>
            Created on <b>{convertIsoDateToMoment(todo.create_date)}</b> by <b>{todo.creatorName}</b>
          </Typography.Text>
          <Typography.Text>
            Last updated on <b>{convertIsoDateToMoment(todo.update_date)}</b>
          </Typography.Text>
        </Space>
      </Spin>
    </Modal>
  );
};

export default ProjectSelectedTodo;
