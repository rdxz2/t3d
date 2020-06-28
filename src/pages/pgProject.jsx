import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Divider, message, Row, Typography } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import CmpDrawer from '../components/cmpDrawer';
import ACTIVITY from '../constants/ACTIVITY';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PADDING from '../constants/PADDING';
import CtxApi from '../contexts/ctxApi';
import ProjectEdit from './pgHome/homeProjects/projectEdit';
import ProjectActivities from './pgProject/projectActivities';
import ProjectCollaborators from './pgProject/projectCollaborators';
import ProjectSelectedTodo from './pgProject/projectSelectedTodo';
import ProjectTodos from './pgProject/projectTodos';

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
  const [todos, todosSet] = React.useState([]);

  // activities
  const [activities, activitiesSet] = React.useState({ projectActivitiesTotalData: 0, projectActivities: [] });

  // online collaborators
  const [collaborators, collaboratorsSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // START -- HELPERS

  // add created to do to the first element (in to do list)
  const unshiftTodos = React.useCallback((newTodo) => {
    return todosSet((_todos) => {
      _todos.unshift(newTodo);

      // set state
      return [..._todos];
    });
  }, []);

  // change edited to do (in to do list)
  const mutateTodos = React.useCallback((newTodo) => {
    return todosSet((_todos) => {
      // get target to do
      const editedTodo = _todos.find((todo) => todo.id === newTodo.id);
      if (!editedTodo) return;

      // change to do properties (only if changed)
      if (newTodo.description) editedTodo.description = newTodo.description;
      if (newTodo.priority) editedTodo.priority = newTodo.priority;
      if (typeof newTodo.is_completed === 'boolean') editedTodo.is_completed = newTodo.is_completed;
      if (typeof newTodo.is_important === 'boolean') editedTodo.is_important = newTodo.is_important;

      console.log('mutating', newTodo);

      // set state
      return [..._todos];
    });
  }, []);

  // add created activity (to do) to the first element (in activity list)
  const unshiftProjectActivities = React.useCallback((newActivity) => {
    return activitiesSet((_activities) => {
      return {
        ..._activities,
        projectActivitiesTotalData: _activities.projectActivitiesTotalData + 1,
        projectActivities: [newActivity, ..._activities.projectActivities],
      };
    });
  }, []);

  // END -- HELPERS

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
      const responseTodos = await svsT3dapi.sendRequest(`api/todo/${projectCode}`, HTTPMETHOD.GET);

      // set to dos
      todosSet(responseTodos.data);

      // send request (activities)
      const responseActivities = await svsT3dapi.sendRequest(`api/project/activities/${projectCode}?pageSize=${ACTIVITY.PAGESIZE}&currentPage=1`, HTTPMETHOD.GET);

      // set activities
      activitiesSet(responseActivities.data);

      // send request (collaborators)
      const responseCollaborators = await svsT3dapi.sendRequest(`api/project/collaborators/${projectCode}`, HTTPMETHOD.GET);

      // set collaborators
      collaboratorsSet(responseCollaborators.data.map((collaborator) => ({ ...collaborator, isOnline: false })));

      // get user name from jwt
      const userInfo = svsT3dapi.getApiJwtInfo();

      // broadcast: joining project room
      strmProject.emitJoin({ projectCode: match.params.projectCode, id: userInfo.id, name: userInfo.name }, (error, data) => {
        if (error) message.error(`error joining project room: ${error}`);

        // combine collaborators from sending request with online collaborators from this broadcast callback
        const _collaborators = responseCollaborators.data;

        // set existing collaborators to online
        data.forEach((_data) => {
          // get collaborator by id
          const onlineCollaborator = _collaborators.find((collaborator) => collaborator.id === _data.id);
          if (!onlineCollaborator) return;

          // set online state
          onlineCollaborator.isOnline = true;
        });

        // set collaborators
        collaboratorsSet(_collaborators);
      });
    } catch (error) {}
  }, [handleChangeActivePage, match.params.projectCode, strmProject, svsT3dapi]);

  // START -- PROJECT FUNCTIONALITY

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

  // collaborator joined
  const handleCollaboratorJoined = (data) => {
    // set collaborators
    collaboratorsSet((_collaborators) => {
      // get collaborator by id
      const joinedCollaborator = _collaborators.find((collaborator) => collaborator.id === data.id);
      if (!joinedCollaborator) return _collaborators;

      // set online state
      joinedCollaborator.isOnline = true;

      // set state
      return [..._collaborators];
    });
  };

  // collaborator leaved
  const handleCollaboratorLeaved = (data) => {
    // set collaborators
    collaboratorsSet((_collaborators) => {
      // get leaving collaborator index
      const leavedCollaborator = _collaborators.find((collaborator) => collaborator.id === data.id);
      if (!leavedCollaborator) return _collaborators;

      // set offline state
      leavedCollaborator.isOnline = false;

      // set state
      return [..._collaborators];
    });
  };

  // END -- PROJECT FUNCTIONALITY

  // START -- TODO FUNCTIONALITY

  // to do created
  const handleTodoCreated = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // send streamer message
    strmProject.emitTodoCreating({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity }, () => {});

    // // unshift to do
    // unshiftTodos(newTodo);

    // // append activity
    // unshiftProjectActivities(newActivity);
  };

  // to do created (socket)
  const handleTodoCreatedEmit = React.useCallback(
    // unshift to do
    (response) => {
      const { todo: newTodo, activity: newActivity } = response;

      // append to do
      unshiftTodos(newTodo);

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [unshiftProjectActivities, unshiftTodos]
  );

  // to do completed toggled
  const handleTodoCompleteToggled = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // broadcast: to do complete toggled
    strmProject.emitTodoCompleteToggling({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity });
  };

  // to do completed toggled (socket)
  const handleTodoCompleteToggledEmit = React.useCallback(
    (response) => {
      const { todo: newTodo, activity: newActivity } = response;

      // mutate todo
      mutateTodos(newTodo);

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [mutateTodos, unshiftProjectActivities]
  );

  // to do important toggled
  const handleTodoImportantToggled = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // broadcast: to do important toggled
    strmProject.emitTodoImportantToggling({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity });
  };

  // to do important toggled (socket)
  const handleTodoImportantToggledEmit = React.useCallback(
    (response) => {
      const { todo: newTodo, activity: newActivity } = response;

      // mutate todo
      mutateTodos(newTodo);

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [mutateTodos, unshiftProjectActivities]
  );

  // END -- TODO FUNCTIONALITY

  // START -- MODAL FUNCTIONALITY

  // open to do detail modal
  const handleModalTodoOpen = (todoId) => history.push(`${match.url}/todo/${todoId}`);

  // to do priority changed in modal
  const handlePriorityEdited = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // broadcast: changing priority
    strmProject.emitTodoPriorityEditing({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity });
  };

  // to do priority changed (socket)
  const handlePriorityEditedEmit = React.useCallback(
    (response) => {
      const { todo: newTodo, activity: newActivity } = response;

      // change to do
      mutateTodos(newTodo);

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [mutateTodos, unshiftProjectActivities]
  );

  // to do description changed in modal
  const handleDescriptionEdited = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // broadcast: to do changed
    strmProject.emitTodoDescriptionEditing({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity });
  };

  // to do description changed (socket)
  const handleDescriptionEditedEmit = React.useCallback(
    (response) => {
      const { todo: newTodo, activity: newActivity } = response;

      // change to do
      mutateTodos(newTodo);

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [mutateTodos, unshiftProjectActivities]
  );

  // to do detail changed in modal
  const handleDetailEdited = (response) => {
    const { todo: newTodo, activity: newActivity } = response.data;

    // broadcast: to do detail changed
    strmProject.emitTodoDetailEditing({ projectCode: match.params.projectCode, todo: newTodo, activity: newActivity });
  };

  // to do detail changed (socket)
  const handleDetailEditedEmit = React.useCallback(
    (response) => {
      const { activity: newActivity } = response;

      // append activity
      unshiftProjectActivities(newActivity);
    },
    [unshiftProjectActivities]
  );

  // to do tag created in modal
  const handleTodoTagCreated = (response) => {
    const { tag: newTag, activity: newActivity } = response.data;

    // broadcast: tag created
    strmProject.emitTodoTagCreating({ projectCode: match.params.projectCode, tag: newTag, activity: newActivity }, () => {});
  };

  // to do tag created by other user
  const handleTodoTagCreatedEmit = React.useCallback(
    (response) => {
      // append activity
      unshiftProjectActivities(response.activity);
    },
    [unshiftProjectActivities]
  );

  // to do tag deleted in modal
  const handleTodoTagDeleted = (response) => {
    const { tag: newTag, activity: newActivity } = response.data;

    // broadcast: tag created
    strmProject.emitTodoTagCreating({ projectCode: match.params.projectCode, tag: newTag, activity: newActivity }, () => {});
  };

  // to do tag deleted by other user
  const handleTodoTagDeletedEmit = React.useCallback(
    (response) => {
      // append activity
      unshiftProjectActivities(response.activity);
    },
    [unshiftProjectActivities]
  );

  // END -- MODAL FUNCTIONALITY

  // START -- ACTIVITIES FUNCTIONALITY

  const handleLoadMoreActivities = async (currentPage) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/project/activities/${match.params.projectCode}?pageSize=${ACTIVITY.PAGESIZE}&currentPage=${currentPage}`, HTTPMETHOD.GET);

      // set activities
      activitiesSet((_activities) => ({ projectActivitiesTotalData: response.data.projectActivitiesTotalData, projectActivities: [..._activities.projectActivities, ...response.data.projectActivities] }));
    } catch (error) {
      throw error;
    }
  };

  // END -- ACTIVITIES FUNCTIONALITY

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // prepare initial data
    prepareInitialData();
  }, [prepareInitialData]);

  // subscribers
  React.useEffect(() => {
    // subscribe to server emits
    strmProject.registerJoined(handleCollaboratorJoined);
    strmProject.registerLeaved(handleCollaboratorLeaved);
    strmProject.registerTodoCreated(handleTodoCreatedEmit);
    strmProject.registerTodoCompleteToggled(handleTodoCompleteToggledEmit);
    strmProject.registerTodoImportantToggled(handleTodoImportantToggledEmit);
    strmProject.registerTodoTagCreated(handleTodoTagCreatedEmit);
    strmProject.registerTodoTagDeleted(handleTodoTagDeletedEmit);
    strmProject.registerTodoDescriptionEdited(handleDescriptionEditedEmit);
    strmProject.registerTodoDetailEdited(handleDetailEditedEmit);
    strmProject.registerTodoPriorityEdited(handlePriorityEditedEmit);

    return () => {
      // unsubscribe from server emits
      strmProject.unregisterJoined();
      strmProject.unregisterLeaved();
      strmProject.unregisterTodoCreated();
      strmProject.unregisterTodoCompleteToggled();
      strmProject.unregisterTodoImportantToggled();
      strmProject.unregisterTodoTagCreated();
      strmProject.unregisterTodoTagDeleted();
      strmProject.unregisterTodoDescriptionEdited();
      strmProject.unregisterTodoDetailEdited();
      strmProject.unregisterTodoPriorityEdited();

      // broadcast: leaving the project room
      strmProject.emitLeave(match.params.projectCode, () => {});
    };
  }, [
    handleDescriptionEditedEmit,
    handleDetailEditedEmit,
    handlePriorityEditedEmit,
    handleTodoCompleteToggledEmit,
    handleTodoCreatedEmit,
    handleTodoImportantToggledEmit,
    handleTodoTagCreatedEmit,
    handleTodoTagDeletedEmit,
    match.params.projectCode,
    strmProject,
    svsT3dapi,
  ]);

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
          <Col span={14}>
            <ProjectTodos
              todos={todos}
              todosSet={todosSet}
              projectCode={match.params.projectCode}
              handleTodoCreated={handleTodoCreated}
              handleTodoCompleteToggled={handleTodoCompleteToggled}
              handleTodoImportantToggled={handleTodoImportantToggled}
              handleModalTodoOpen={handleModalTodoOpen}></ProjectTodos>
          </Col>
          {/* others */}
          <Col span={10}>
            {/* activities */}
            <ProjectActivities activities={activities} activitiesSet={activitiesSet} projectCode={match.params.projectCode} onLoadMore={handleLoadMoreActivities}></ProjectActivities>
            {/* divider */}
            <Divider></Divider>
            {/* online collaborators */}
            <ProjectCollaborators collaborators={collaborators}></ProjectCollaborators>
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
        render={({ match: _match }) => (
          <ProjectSelectedTodo
            match={_match}
            history={history}
            unshiftProjectActivities={unshiftProjectActivities}
            handleTagCreated={handleTodoTagCreated}
            handleTagDeleted={handleTodoTagDeleted}
            handleDescriptionEdited={handleDescriptionEdited}
            handleDetailEdited={handleDetailEdited}
            handlePriorityEdited={handlePriorityEdited}></ProjectSelectedTodo>
        )}></Route>
    </>
  );
};

export default PgProject;
