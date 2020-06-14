import React from 'react';
import { useHistory } from 'react-router';
import CtxApi from '../contexts/ctxApi';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import { Typography, Row, Col } from 'antd';
import ProjectToDos from './pgProject/projectToDos';
import ProjectActivities from './pgProject/projectActivities';

const PgProject = ({ match, handleChangeActivePage }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // project
  const [project, projectSet] = React.useState({});

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    svsT3dapi
      .sendRequest(`api/project/${match.params.projectCode}`, HTTPMETHOD.GET)
      .then((response) => {
        // change page title
        handleChangeActivePage(response.data.code);

        // set project
        projectSet(response.data);
      })
      .catch((error) => {});
  }, [handleChangeActivePage, match.params.projectCode, svsT3dapi]);

  // END -- EFFECTS

  return (
    <>
      {/* project name */}
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {project.name}
      </Typography.Title>
      <Typography.Text>{project.code}</Typography.Text>
      {/* row */}
      <Row>
        {/* to do list */}
        <Col span={16}>
          <ProjectToDos projectCode={project.code}></ProjectToDos>
        </Col>
        {/* activities */}
        <Col span={8}>
          <ProjectActivities projectCode={project.code}></ProjectActivities>
        </Col>
      </Row>
    </>
  );
};

export default PgProject;
