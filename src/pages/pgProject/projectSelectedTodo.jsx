import { Col, Divider, Modal, Row, Space, Typography } from 'antd';
import React from 'react';

import ACTIVITY from '../../constants/ACTIVITY';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import SelectedTodoActivities from './projectSelectedTodo/selectedTodoActivities';
import SelectedTodoComments from './projectSelectedTodo/selectedTodoComments';
import SelectedTodoDescription from './projectSelectedTodo/selectedTodoDescription';
import SelectedTodoDetail from './projectSelectedTodo/selectedTodoDetail';
import SelectedTodoPriority from './projectSelectedTodo/selectedTodoPriority';
import SelectedTodoTags from './projectSelectedTodo/selectedTodoTags';
import SelectedTodoReminder from './projectSelectedTodo/selectedTodoReminder';
import SelectedTodoWorkDate from './projectSelectedTodo/selectedTodoWorkDate';

const ProjectSelectedTodo = ({ match, history, handleDescriptionEdited, handleDetailEdited, handlePriorityEdited, handleTagCreated, handleTagDeleted, handleTodoCommented, handleTodoWorkDateEdited }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // to do
  const [todo, todoSet] = React.useState({});

  // to do comments

  // to do activities
  const [todoActivities, todoActivitiesSet] = React.useState({ totalDataFiltered: 0, data: [] });

  // modal visible state
  const [isModalVisible, isModalVisibleSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // START -- HELPERS

  const unshiftTodoActivities = (newActivity) => {
    // unshift to do activities
    return todoActivitiesSet((_activities) => {
      return {
        ..._activities,
        totalDataFiltered: _activities.totalDataFiltered + 1,
        data: [newActivity, ..._activities.data],
      };
    });
  };

  // END -- HELPERS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // send request (to do detail)
    const responseTodoDetail = await svsT3dapi.sendRequest(`api/todo/detail/${match.params.id}`, HTTPMETHOD.GET);

    // set to do detail
    todoSet(responseTodoDetail.data);

    // send request (comments)

    // set comments

    // send request (activities)
    const responseTodoActivities = await svsT3dapi.sendRequest(`api/todo/activities/${match.params.id}?pageSize=${ACTIVITY.PAGESIZE}&currentPage=1`, HTTPMETHOD.GET);

    // set activities
    todoActivitiesSet(responseTodoActivities.data);
  }, [match.params.id, svsT3dapi]);

  // close modal
  const handleCloseModal = () => isModalVisibleSet(false);
  const handleRedirectToBefore = () => history.goBack();

  // load more to do activities
  const handleLoadMoreActivities = React.useCallback(
    async (currentPage) => {
      try {
        // send request
        const response = await svsT3dapi.sendRequest(`api/todo/activities/${match.params.id}?pageSize=${ACTIVITY.PAGESIZE}&currentPage=${currentPage}`, HTTPMETHOD.GET);

        // set activities
        todoActivitiesSet((_activities) => ({ totalDataFiltered: response.data.totalDataFiltered, data: [..._activities.data, ...response.data.data] }));
      } catch (error) {
        throw error;
      }
    },
    [match.params.id, svsT3dapi]
  );

  // edited
  const handleDescriptionEditedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleDescriptionEdited(response);
    },
    [handleDescriptionEdited]
  );

  // edited
  const handleDetailEditedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleDetailEdited(response);
    },
    [handleDetailEdited]
  );

  // edited
  const handleTagCreatedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleTagCreated(response);
    },
    [handleTagCreated]
  );

  // edited
  const handleTagDeletedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleTagDeleted(response);
    },
    [handleTagDeleted]
  );

  // priority edited
  const handlePriorityEditedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handlePriorityEdited(response);
    },
    [handlePriorityEdited]
  );

  // commented
  const handleTodoCommentedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleTodoCommented(response);
    },
    [handleTodoCommented]
  );

  // work date edited
  const handleTodoWorkDateEditedModal = React.useCallback(
    (response) => {
      // append activity
      unshiftTodoActivities(response.data.activity);

      // run callback
      handleTodoWorkDateEdited(response);
    },
    [handleTodoWorkDateEdited]
  );

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  // END -- EFFECTS

  return (
    <Modal destroyOnClose width='65vw' footer={null} visible={isModalVisible} onCancel={handleCloseModal} afterClose={handleRedirectToBefore} style={{ top: 20 }}>
      {/* completed checkbox */}
      {/* <Checkbox defaultChecked={todo.isCompleted} onChange={handleToggleTodoCompleted}></Checkbox> */}
      {/* important flag */}
      {/* <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleTodoImportant}></StarTwoTone> */}
      {/* description */}
      <SelectedTodoDescription todo={todo} handleDescriptionEdited={handleDescriptionEditedModal}></SelectedTodoDescription>
      {/* row */}
      <Row gutter={[16]}>
        {/* column 1 */}
        <Col span={14}>
          <Space direction='vertical' style={{ width: '100%' }}>
            {/* detail */}
            <SelectedTodoDetail todo={todo} handleDetailEdited={handleDetailEditedModal}></SelectedTodoDetail>
            {/* comments */}
            <SelectedTodoComments todo={todo} handleTodoCommented={handleTodoCommentedModal}></SelectedTodoComments>
          </Space>
        </Col>
        {/* column 2 */}
        <Col span={10}>
          <Space direction='vertical' style={{ width: '100%' }}>
            {/* tags */}
            <SelectedTodoTags todo={todo} handleTagCreated={handleTagCreatedModal} handleTagDeleted={handleTagDeletedModal}></SelectedTodoTags>
            {/* priority */}
            <SelectedTodoPriority todo={todo} handlePriorityEdited={handlePriorityEditedModal}></SelectedTodoPriority>
            {/* work date */}
            <SelectedTodoWorkDate todo={todo} handleTodoWorkDateEdited={handleTodoWorkDateEditedModal}></SelectedTodoWorkDate>
            {/* reminder */}
            <SelectedTodoReminder todo={todo}></SelectedTodoReminder>
            {/* to do activities */}
            <SelectedTodoActivities activities={todoActivities} onLoadMore={handleLoadMoreActivities}></SelectedTodoActivities>
            {/* meta */}
            <Divider></Divider>
            <Typography.Text>
              Created by <b>{todo.creatorName}</b>
            </Typography.Text>
            <Typography.Text>
              Created on <b>{convertIsoDateToMoment(todo.create_date)}</b>
            </Typography.Text>
            <Typography.Text>
              Last updated on <b>{convertIsoDateToMoment(todo.update_date)}</b>
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProjectSelectedTodo;
