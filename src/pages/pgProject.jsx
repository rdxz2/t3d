import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography, message } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import CmpDrawer from '../components/cmpDrawer';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PADDING from '../constants/PADDING';
import CtxApi from '../contexts/ctxApi';
import ProjectEdit from './pgHome/homeProjects/projectEdit';
import ProjectActivities from './pgProject/projectActivities';
import ProjectSelectedToDo from './pgProject/projectSelectedToDo';
import ProjectToDos from './pgProject/projectToDos';
import ProjectCollaborators from './pgProject/projectCollaborators';

const PgProject = ({ match, handleChangeActivePage }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi, strmProject } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // project
  const [project, projectSet] = React.useState({});

  // to do list
  const [toDos, toDosSet] = React.useState([]);

  // activities
  const [activities, activitiesSet] = React.useState([]);

  // online collaborators
  const [collaborators, collaboratorsSet] = React.useState([]);
  const [onlineCollaborators, onlineCollaboratorsSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // get project code from url params
    const projectCode = match.params.projectCode;

    try {
      // send request (project)
      const responseProject = await svsT3dapi.sendRequest(`api/project/${projectCode}`, HTTPMETHOD.GET);

      // change page title
      handleChangeActivePage(responseProject.data.code);

      // set project
      projectSet(responseProject.data);

      // send request (to dos)
      const responseToDos = await svsT3dapi.sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.GET);

      // set to dos
      toDosSet(responseToDos.data);

      // send request (activities)
      const responseActivities = await svsT3dapi.sendRequest(`api/project/activities/${projectCode}`, HTTPMETHOD.GET);

      // set activities
      activitiesSet(responseActivities.data);

      // send request (collaborators)
      const responseCollaborators = await svsT3dapi.sendRequest(`api/project/collaborators/${projectCode}`, HTTPMETHOD.GET);

      // set collaborators
      collaboratorsSet(responseCollaborators.data);
    } catch (error) {}
  }, [handleChangeActivePage, match.params.projectCode, svsT3dapi]);

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

  // open to do detail modal
  const handleModalToDoOpen = (toDoId) => history.push(`${match.url}/todo/${toDoId}`);

  // to do priority changed in modal
  const handlePriorityChanged = (toDoId, priority) =>
    toDosSet((_toDos) => {
      // get updated to do
      const updatedToDo = _toDos.find((toDo) => toDo.id === toDoId);

      // update to do
      updatedToDo.priority = priority;

      // set state
      return _toDos;
    });

  // to do description changed in modal
  const handleDescriptionChanged = (toDoId, description) =>
    toDosSet((_toDos) => {
      // get updated to do
      const updatedToDo = _toDos.find((toDo) => toDo.id === toDoId);

      // update to do
      updatedToDo.description = description;

      // set state
      return _toDos;
    });

  // collaborator joined
  const handleCollaboratorJoined = (data) => onlineCollaboratorsSet((_onlineCollaborators) => (_onlineCollaborators.indexOf(data) > -1 ? _onlineCollaborators : [..._onlineCollaborators, data]));

  // collaborator leaved
  const handleCollaboratorLeaved = (data) =>
    onlineCollaboratorsSet((_onlineCollaborators) => {
      // get leaving collaborator index
      const leavingCollaboratorIndex = _onlineCollaborators.indexOf(data);

      // delete leaving collaborator from online collaborators
      _onlineCollaborators.splice(leavingCollaboratorIndex, 1);

      // set state
      return [..._onlineCollaborators];
    });

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // prepare initial data
    prepareInitialData();
  }, [prepareInitialData]);

  // on user joined subscriber
  React.useEffect(() => {
    // subscribe to server emits
    strmProject.registerJoined(handleCollaboratorJoined);
    strmProject.registerLeaved(handleCollaboratorLeaved);

    // get user name from jwt
    const userInfo = svsT3dapi.getApiJwtInfo();

    // broadcast: joining project room
    strmProject.emitJoin({ projectCode: match.params.projectCode, name: userInfo.name }, (error, data) => {
      if (error) message.error(`error joining project room: ${error}`);

      // set online collaborators
      onlineCollaboratorsSet(data);
    });

    return () => {
      // unsubscribe to server emits
      strmProject.unregisterJoined();
      strmProject.unregisterLeaved();

      // broadcast: leaving the project room
      strmProject.emitLeave(match.params.projectCode, () => {});
    };
  }, [match.params.projectCode, strmProject, svsT3dapi]);

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
            <ProjectToDos toDos={toDos} toDosSet={toDosSet} projectCode={match.params.projectCode} handleModalToDoOpen={handleModalToDoOpen}></ProjectToDos>
          </Col>
          {/* others */}
          <Col span={8}>
            {/* activities */}
            <ProjectActivities activities={activities} activitiesSet={activitiesSet} projectCode={match.params.projectCode}></ProjectActivities>
            {/* online collaborators */}
            <ProjectCollaborators collaborators={collaborators} onlineCollaborators={onlineCollaborators}></ProjectCollaborators>
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
      {/* to do detail */}
      <Route
        path={`${match.url}/todo/:id`}
        render={({ match: _match }) => <ProjectSelectedToDo match={_match} history={history} handleDescriptionChanged={handleDescriptionChanged} handlePriorityChanged={handlePriorityChanged}></ProjectSelectedToDo>}></Route>
    </>
  );
};

export default PgProject;
