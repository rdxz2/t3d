import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import CmpDrawer from '../components/cmpDrawer';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import CtxApi from '../contexts/ctxApi';
import ProjectEdit from './pgHome/homeProjects/projectEdit';
import ProjectActivities from './pgProject/projectActivities';
import ProjectToDos from './pgProject/projectToDos';
import PADDING from '../constants/PADDING';

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

  // open drawer: project edit
  const handleOpenDrawerProjectEdit = (projectCode) => history.push(`${projectCode}/edit`);

  // project edited
  const handleProjectEdited = (response) => {
    console.log('EDIT SUCES', response);

    // recentProjectsSet((_recentProjects) => {
    //   // get updated project index
    //   const updatedProjectIndex = _recentProjects.indexOf((_recentProject) => _recentProject.code === response.data.codeBefore);
    //   if (updatedProjectIndex < 0) return message.error(`'${response.data.codeBefore}' not found in project list`);

    //   // get updated project
    //   const updatedProject = _recentProjects[updatedProjectIndex];

    //   // edit
    //   updatedProject.code = response.data.code;
    //   updatedProject.name = response.data.name;
    //   updatedProject.author = response.data.author;
    //   updatedProject.description = response.data.description;
    //   updatedProject.last_accessed = response.data.last_accessed;

    //   // delete updated project
    //   _recentProjects = _recentProjects.splice(updatedProjectIndex, 1);

    //   // insert newly updated project
    //   _recentProjects.unshift(updatedProject);

    //   // set state
    //   return _recentProjects;
    // });
  };

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
      <Typography.Title level={2} style={{ ...PADDING.LEFT_RIGHT() }}>
        {project.name}
        <Button type='link' icon={project.is_owning ? <EditOutlined></EditOutlined> : null} onClick={() => handleOpenDrawerProjectEdit(match.params.projectCode)}></Button>
      </Typography.Title>
      {/* row */}
      <section style={{ ...PADDING.LEFT_RIGHT() }}>
        <Row gutter={16}>
          {/* to do list */}
          <Col span={16}>
            <ProjectToDos projectCode={match.params.projectCode}></ProjectToDos>
          </Col>
          {/* activities */}
          <Col span={8}>
            <ProjectActivities projectCode={match.params.projectCode}></ProjectActivities>
          </Col>
        </Row>
      </section>
      {/* routes */}
      {/* edit project */}
      <Route
        path={`${match.path}/edit`}
        render={({ match: _match }) => (
          <CmpDrawer title={`Edit ${_match.params.projectCode}`} width={500} history={history} drawerCloseCallback={handleProjectEdited}>
            <ProjectEdit match={_match}></ProjectEdit>
          </CmpDrawer>
        )}></Route>
    </>
  );
};

export default PgProject;
