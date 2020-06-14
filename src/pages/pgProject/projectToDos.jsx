import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import { Typography, Row, Col, Input } from 'antd';
import _ from 'lodash';
import INPUTSELECT from '../../constants/INPUTSELECT';
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
    svsT3dapi.sendRequest(`api/project/todos/${projectCode}`, HTTPMETHOD.GET);
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
          <Input name='search' placeholder='search to dos' onBlur={_.debounce(handleSearchToDos, INPUTSELECT.SEARCH_DELAY)}></Input>
        </Col>
        {/* filter bar */}
        <Col span={8}>filter bar</Col>
      </Row>
      {/* to do list */}
      {toDos.map((toDo, toDoIndex) => console.log('to do', toDoIndex))}
    </>
  );
};

export default ProjectToDos;
