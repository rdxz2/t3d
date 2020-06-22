import './projectToDos.css';

import { Col, Input, Row, Select, Space, Spin } from 'antd';
import _ from 'lodash';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import SELECTOPTIONS from '../../constants/SELECTOPTIONS';
import CtxApi from '../../contexts/ctxApi';
import ToDoCreate from './projectToDos/toDoCreate';
import ToDoLine from './projectToDos/toDoLine';

const ProjectToDos = ({ toDos, toDosSet, projectCode, handleModalToDoOpen }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi, strmProject } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // searching state
  const [isSearching, isSearchingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // search: to dos
  const handleSearchToDos = (event) => {
    event.persist();
    handleSearchToDosDebounced(event.target.value);
  };
  const handleSearchToDosDebounced = _.debounce(async (value) => {
    // searching...
    isSearchingSet(true);
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/${projectCode}?search=${value}`, HTTPMETHOD.GET);

      // set to do list
      toDosSet(response.data);
    } catch (error) {
    } finally {
      // not searching...
      isSearchingSet(false);
    }
  }, INPUTSELECT.SEARCH_DELAY);

  // to do created
  const handleToDoCreated = (response) => {
    // send streamer message
    strmProject.emitToDoCreated({ projectCode, description: response.data.description });

    // set to dos
    toDosSet((_toDos) => {
      // add created to do to the first element
      _toDos.unshift({
        _id: response.data._id,
        description: response.data.description,
      });

      // set state
      return [..._toDos];
    });
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* create to do */}
      <ToDoCreate projectCode={projectCode} handleAfterCreated={handleToDoCreated}></ToDoCreate>
      {/* to do list actions */}
      <Row gutter={8}>
        {/* filter bar */}
        <Col id='col-filter' span={4}>
          <Select defaultValue={SELECTOPTIONS.TODO_FILTER[0].value} name='toDoFilter'>
            {SELECTOPTIONS.TODO_FILTER.map((filter, filterIndex) => (
              <Select.Option key={filterIndex} value={filter.value}>
                {filter.text}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* search bar */}
        <Col span={20}>
          <Input allowClear name='toDoSearch' placeholder='search to dos' onChange={handleSearchToDos}></Input>
        </Col>
      </Row>
      {/* to do list */}
      <Spin spinning={isSearching} tip='searching todos..'>
        <Space direction='vertical'>
          {toDos.map((toDo, toDoIndex) => (
            <ToDoLine key={toDoIndex} toDo={toDo} handleModalToDoOpen={handleModalToDoOpen}></ToDoLine>
          ))}
        </Space>
      </Spin>
    </Space>
  );
};

export default ProjectToDos;
