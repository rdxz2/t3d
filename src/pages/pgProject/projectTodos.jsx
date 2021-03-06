import './projectTodos.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Col, Input, Row, Select, Space, Spin } from 'antd';
import _ from 'lodash';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import SELECTOPTIONS from '../../constants/SELECTOPTIONS';
import CtxApi from '../../contexts/ctxApi';
import TodoCreate from './projectTodos/todoCreate';
import TodoLine from './projectTodos/todoLine';

const ProjectTodos = ({ todos, todosSet, projectCode, handleTodoCreated, handleTodoCompleteToggled, handleTodoImportantToggled, handleModalTodoOpen }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // searching state
  const [isSearching, isSearchingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // search: to dos
  const handleSearchTodos = (event) => {
    event.persist();
    handleSearchTodosDebounced(event.target.value);
  };
  const handleSearchTodosDebounced = _.debounce(async (value) => {
    // searching...
    isSearchingSet(true);
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/${projectCode}?search=${value}`, HTTPMETHOD.GET);

      // set to do list
      todosSet(response.data);
    } catch (error) {
    } finally {
      // not searching...
      isSearchingSet(false);
    }
  }, INPUTSELECT.SEARCH_DELAY);

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* create to do */}
      <TodoCreate projectCode={projectCode} handleAfterCreated={handleTodoCreated}></TodoCreate>
      {/* to do list actions */}
      <Row gutter={8}>
        {/* filter bar */}
        <Col id='col-filter' span={4}>
          <Select defaultValue={SELECTOPTIONS.TODO_FILTER[0].value} name='todoFilter'>
            {SELECTOPTIONS.TODO_FILTER.map((filter, filterIndex) => (
              <Select.Option key={filterIndex} value={filter.value}>
                {filter.text}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* search bar */}
        <Col span={20}>
          <Input allowClear name='todoSearch' placeholder='search to dos' onChange={handleSearchTodos}></Input>
        </Col>
      </Row>
      {/* to do list */}
      <div style={{ maxHeight: 'calc(80vh - 89px)', overflowY: 'auto' }}>
        <Spin spinning={isSearching} tip='searching todos..'>
          <Space direction='vertical'>
            {todos.map((todo, todoIndex) => (
              <TodoLine key={todoIndex} todo={todo} handleTodoCompleteToggled={handleTodoCompleteToggled} handleTodoImportantToggled={handleTodoImportantToggled} handleModalTodoOpen={handleModalTodoOpen}></TodoLine>
            ))}
          </Space>
        </Spin>
      </div>
    </Space>
  );
};

export default ProjectTodos;
