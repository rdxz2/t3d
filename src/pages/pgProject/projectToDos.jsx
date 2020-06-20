import './projectToDos.css';

import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Space, Spin } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import SELECTOPTIONS from '../../constants/SELECTOPTIONS';
import CtxApi from '../../contexts/ctxApi';
import ToDoCreate from './projectToDos/toDoCreate';
import ToDoLine from './projectToDos/toDoLine';

const ProjectToDos = ({ projectCode }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // to dos
  const [toDos, toDosSet] = React.useState([]);

  // searching state
  const [isSearching, isSearchingSet] = React.useState(true);

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
  const handleToDoCreated = (response) =>
    toDosSet((_toDos) => {
      // add created to do to the first element
      _toDos.unshift({
        _id: response.data._id,
        description: response.data.description,
      });

      console.log('_toDos', _toDos);

      // set state
      return [..._toDos];
    });

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    svsT3dapi
      .sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.GET)
      .then((response) => {
        // set to do list
        toDosSet(response.data);

        // not searching...
        isSearchingSet(false);
      })
      .catch((error) => {});
  }, [projectCode, svsT3dapi]);

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* create to do */}
      <ToDoCreate projectCode={projectCode} handleAfterCreated={handleToDoCreated}></ToDoCreate>
      {/* to do list actions */}
      <Row gutter={8}>
        {/* filter bar */}
        <Col id='col-filter' span={4}>
          <Select defaultValue={SELECTOPTIONS.FILTER[0].value} name='toDoFilter'>
            {SELECTOPTIONS.FILTER.map((filter, filterIndex) => (
              <Select.Option key={filterIndex} value={filter.value}>
                {filter.text}
              </Select.Option>
            ))}
          </Select>
        </Col>
        {/* search bar */}
        <Col span={20}>
          <Input name='toDoSearch' placeholder='search to dos' onChange={handleSearchToDos}></Input>
        </Col>
      </Row>
      {/* to do list */}
      <Spin spinning={isSearching}>
        <Space direction='vertical'>
          {toDos.map((toDo, toDoIndex) => (
            <ToDoLine key={toDoIndex} toDo={toDo}></ToDoLine>
          ))}
        </Space>
      </Spin>
    </Space>
  );
};

export default ProjectToDos;
