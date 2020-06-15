import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import CtxApi from '../../contexts/ctxApi';
import ToDoCreate from './projectToDos/toDoCreate';

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

  // creating state
  const [isCreatingToDo, isCreatingToDoSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // search: to dos
  const handleSearchToDos = async (value) => {
    console.log('searching todos', value);
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    svsT3dapi
      .sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.GET)
      .then((response) => console.log('TODO', response))
      .catch((error) => {});
  }, [projectCode, svsT3dapi]);

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={3}>To do list</Typography.Title>
      {/* filter actions */}
      <Row>
        {/* search bar */}
        <Col span={16}>
          <Input name='searchToDo' placeholder='search to dos' onBlur={_.debounce(handleSearchToDos, INPUTSELECT.SEARCH_DELAY)}></Input>
        </Col>
        {/* filter bar */}
        <Col span={8}>
          <Select name=''></Select>
        </Col>
      </Row>
      {/* add to do */}
      {isCreatingToDo ? (
        // create to do form
        <ToDoCreate></ToDoCreate>
      ) : (
        // add button
        <Button block type='primary' icon={<PlusOutlined></PlusOutlined>}></Button>
      )}
      {/* to do list */}
      {toDos.map((toDo, toDoIndex) => console.log('to do', toDoIndex))}
    </>
  );
};

export default ProjectToDos;
