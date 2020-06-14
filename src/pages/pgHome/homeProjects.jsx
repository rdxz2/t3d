import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
import { Typography, Card, Drawer, Button, Col, Row, Input } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FrProjectCreate from './homeProjects/frProjectCreate';
import CmpDrawer from '../../components/cmpDrawer';
import { PlusOutlined, SettingOutlined, EllipsisOutlined, UserOutlined, ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import { convertIsoDateToMoment } from '../../utilities/utlType';
import TIMEFORMAT from '../../constants/TIMEFORMAT';

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
  const handleOpenDrawerProjetCreate = () => history.push(`${match.path}/createproject`);

  // navigate: project
  const handleNavigateToProject = (projectCode) => history.push(`/project/${projectCode}`);

  // project created
  const handleProjectCreated = (response) => {
    console.log('created', response);
    // add created project
    recentProject.unshift({
      name: response.data.name,
      code: response.data.code,
      author: response.data.author,
      description: response.data.description,
      last_accessed: response.data.last_accessed,
    });
  };

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
    <>
      {/* title */}
      <Row>
        <Col span={18}>
          <Typography.Title level={3} style={{ paddingLeft: 16 }}>
            Projects
          </Typography.Title>
        </Col>
        <Col span={6} style={{ paddingRight: 16 }}>
          <Input name='filterproject' placeholder={'search project'} onBlur={() => {}}></Input>
        </Col>
      </Row>
      {/* project list */}
      <PerfectScrollbar id='recent-projects' /**onWheel={handleHorizontalScroll} */>
        {/* render create project card */}
        <Card id='recent-project-card-create' className='recent-project-card' bordered={false}>
          <Button type='primary' size='large' icon={<PlusOutlined></PlusOutlined>} onClick={handleOpenDrawerProjetCreate} style={{ width: '100%', height: '100%' }}></Button>
        </Card>
        {/* render other projects */}
        {recentProject.map((project, projectIndex) => (
          <Card
            className='recent-project-card'
            key={projectIndex}
            size='small'
            title={`[${project.code}] ${project.name}`}
            extra={<Button type='link' icon={<SettingOutlined></SettingOutlined>}></Button>}
            actions={[<Button block type='primary' icon={<ArrowRightOutlined></ArrowRightOutlined>} onClick={() => handleNavigateToProject(project.code)}></Button>]}>
            <p>
              <EllipsisOutlined></EllipsisOutlined> {project.description}
            </p>
            <p>
              <UserOutlined></UserOutlined> {project.author}
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
            <FrProjectCreate match={_match}></FrProjectCreate>
          </CmpDrawer>
        )}></Route>
      {/* edit project */}
    </>
  );
};

export default HomeProjects;
