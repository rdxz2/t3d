import './pgHome.css';

import { Col, Row, Space } from 'antd';
import React from 'react';

import HomeCalendar from './pgHome/homeCalendar';
import HomeProjects from './pgHome/homeProjects';
import HomeRecentActivities from './pgHome/homeRecentActivities';
import PADDING from '../constants/PADDING';
import CtxApi from '../contexts/ctxApi';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import ACTIVITY from '../constants/ACTIVITY';

const PgHome = ({ match, handleChangeActivePage }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // recent projects
  const [recentProjects, recentProjectsSet] = React.useState([]);

  // recent activities
  const [recentActivities, recentActivitiesSet] = React.useState({ projectActivitiesTotalData: 0, projectActivities: [] });

  // schedules
  const [schedules, schedulesSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // send request (projects)
    const responseRecentProjects = await svsT3dapi.sendRequest('api/user/recentprojects', HTTPMETHOD.GET);

    // set projects
    recentProjectsSet(responseRecentProjects.data);

    // send request (recent activities)
    const responseRecentActivities = await svsT3dapi.sendRequest(`api/user/recentactivities?pageSize=${ACTIVITY.PAGESIZE}&currentPage=1`, HTTPMETHOD.GET);

    // set recent activities
    recentActivitiesSet(responseRecentActivities.data);

    // send request (schedule)
    const responseSchedule = await svsT3dapi.sendRequest('api/user/schedule', HTTPMETHOD.GET);

    // set schedule
    schedulesSet(responseSchedule.data);
  }, [svsT3dapi]);

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

  // load more recent activities
  const handleLoadMoreActivities = async (currentPage) => {
    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/user/recentactivities?pageSize=${ACTIVITY.PAGESIZE}&currentPage=${currentPage}`, HTTPMETHOD.GET);

      // set activities
      recentActivitiesSet((_activities) => ({ projectActivitiesTotalData: response.data.projectActivitiesTotalData, projectActivities: [..._activities.projectActivities, ...response.data.projectActivities] }));
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    // change active page
    handleChangeActivePage('Home');

    // prepare initial data
    prepareInitialData();
  }, [handleChangeActivePage, prepareInitialData]);

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* project */}
      <HomeProjects recentProjects={recentProjects} recentProjectsSet={recentProjectsSet} handleProjectCreated={handleProjectCreated} match={match}></HomeProjects>
      {/* calendar & activities */}
      <section style={{ ...PADDING.LEFT_RIGHT() }}>
        <Row gutter={16}>
          {/* recent activities */}
          <Col span={8}>
            <HomeRecentActivities recentActivities={recentActivities} handleLoadMoreActivities={handleLoadMoreActivities}></HomeRecentActivities>
          </Col>
          {/* calendar */}
          <Col span={16}>
            <HomeCalendar schedules={schedules} schedulesSet={schedulesSet}></HomeCalendar>
          </Col>
        </Row>
      </section>
      {/* dummy */}
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
      <div>dummy</div>
    </Space>
  );
};

export default PgHome;
