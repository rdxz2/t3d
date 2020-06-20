import './homeProjects.css';

import { ClockCircleOutlined, EllipsisOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';

import CmpDrawer from '../../components/cmpDrawer';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import PADDING from '../../constants/PADDING';
import TIMEFORMAT from '../../constants/TIMEFORMAT';
import CtxApi from '../../contexts/ctxApi';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import ProjectCreate from './homeProjects/projectCreate';

const HomeProjects = ({ match }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // user projects
  const [recentProject, recentProjectsSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // open drawer: project create
  const handleOpenDrawerProjectCreate = () => history.push(`${match.path}/createproject`);

  // navigate: project
  const handleNavigateToProject = (projectCode) => history.push(`/project/${projectCode}`);

  // search project
  const handleSearchProject = async (event) => {};

  // project created
  const handleProjectCreated = (response) =>
    recentProjectsSet((_recentProjects) => {
      // add created project to the first element
      _recentProjects.unshift({
        name: response.data.name,
        code: response.data.code,
        author: response.data.author,
        description: response.data.description,
        last_accessed: response.data.last_accessed,
        is_owning: response.data.is_owning,
      });

      // set state
      return [..._recentProjects];
    });

  // // horizontal mouse scroll on a container
  // const handleHorizontalScroll = (event) => {
  //   event.preventDefault();
  //   const elementRow = event.target.closest('#recent-projects');
  //   const elementRowScrollPosition = elementRow.scrollLeft;
  //   elementRow.scrollTo({
  //     top: 0,
  //     left: elementRowScrollPosition + event.deltaY,
  //     behaviour: 'smooth',
  //   });
  // };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // load user's recent projects
    svsT3dapi
      .sendRequest('api/user/recentprojects', HTTPMETHOD.GET)
      .then((response) => recentProjectsSet(response.data))
      .catch((error) => {});
  }, [svsT3dapi]);

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* title */}
      <Typography.Title level={3} style={{ ...PADDING.LEFT_RIGHT(), marginBottom: 0 }}>
        Projects
      </Typography.Title>
      {/* search bar */}
      <div style={{ width: 266, paddingLeft: 16 }}>
        <Input name='searchProject' placeholder='search project' onChange={_.debounce(handleSearchProject, INPUTSELECT.SEARCH_DELAY)}></Input>
      </div>
      {/* project list */}
      <PerfectScrollbar id='recent-projects' /**onWheel={handleHorizontalScroll} */>
        {/* render create project card */}
        <Card id='recent-project-card-create' className='recent-project-card' bordered={false}>
          <Button type='primary' size='large' icon={<PlusOutlined></PlusOutlined>} onClick={handleOpenDrawerProjectCreate} style={{ width: '100%', height: '100%' }}></Button>
        </Card>
        {/* render other projects */}
        {recentProject.map((project, projectIndex) => (
          <Card
            className='recent-project-card'
            key={projectIndex}
            size='small'
            title={`[${project.code}] ${project.name}`}
            // extra={project.is_owning ? <Button type='link' icon={<SettingOutlined></SettingOutlined>} onClick={() => handleOpenDrawerProjectEdit(project.code)}></Button> : false}
            onClick={() => handleNavigateToProject(project.code)}
            // actions={[<Button block type='primary' icon={<ArrowRightOutlined></ArrowRightOutlined>} onClick={}></Button>]}
          >
            <p>
              <EllipsisOutlined></EllipsisOutlined> {project.description}
            </p>
            <p>
              <UserOutlined></UserOutlined> {project.is_owning ? <b>{project.author}</b> : project.author}
            </p>
            <p>
              <ClockCircleOutlined></ClockCircleOutlined> {convertIsoDateToMoment(project.last_accessed, TIMEFORMAT.DDMMYYHHMMSS_BACKSLASH)}
            </p>
          </Card>
        ))}
      </PerfectScrollbar>
      {/* routes */}
      {/* create project */}
      <Route
        path={`${match.path}/createproject`}
        render={({ match: _match }) => (
          <CmpDrawer title='Create project' width={500} history={history} drawerCloseCallback={handleProjectCreated}>
            <ProjectCreate match={_match}></ProjectCreate>
          </CmpDrawer>
        )}></Route>
    </Space>
  );
};

export default HomeProjects;
