import './pgHome.css';

import { Col, Row, Space } from 'antd';
import React from 'react';

import ACTIVITY from '../constants/ACTIVITY';
import HTTPMETHOD from '../constants/HTTPMETHOD';
import PADDING from '../constants/PADDING';
import CtxApi from '../contexts/ctxApi';
import HomeProjects from './pgHome/homeProjects';
import HomeRecentActivities from './pgHome/homeRecentActivities';
import moment from 'moment';
import HomeSchedule from './pgHome/homeSchedule';

const now = moment();

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
  const [recentActivities, recentActivitiesSet] = React.useState({ totalDataFiltered: 0, data: [] });

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
    const responseSchedule = await svsT3dapi.sendRequest(`api/user/schedule?date=${encodeURIComponent(now.format())}`, HTTPMETHOD.GET);

    // set schedule
    schedulesSet(responseSchedule.data);
  }, [svsT3dapi]);

  // project created
  const handleProjectCreated = React.useCallback(
    (response) =>
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
      }),
    []
  );

  // load more recent activities
  const handleLoadMoreActivities = React.useCallback(
    async (currentPage) => {
      try {
        // send request
        const response = await svsT3dapi.sendRequest(`api/user/recentactivities?pageSize=${ACTIVITY.PAGESIZE}&currentPage=${currentPage}`, HTTPMETHOD.GET);

        // set activities
        recentActivitiesSet((_activities) => ({ totalDataFiltered: response.data.totalDataFiltered, data: [..._activities.data, ...response.data.data] }));
      } catch (error) {}
    },
    [svsT3dapi]
  );

  // schedule's month changed
  const handleScheduleMonthChanged = React.useCallback(
    async (date) => {
      // send request
      const responseSchedule = await svsT3dapi.sendRequest(`api/user/schedule?date=${encodeURIComponent(date.format())}`, HTTPMETHOD.GET);

      // set schedule
      schedulesSet(responseSchedule.data);
    },
    [svsT3dapi]
  );

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
      {/* recent activities & schedule */}
      <section style={{ ...PADDING.LEFT_RIGHT() }}>
        <Row gutter={16}>
          {/* recent activities */}
          <Col span={8}>
            <HomeRecentActivities recentActivities={recentActivities} handleLoadMoreActivities={handleLoadMoreActivities}></HomeRecentActivities>
          </Col>
          {/* schedule */}
          <Col span={16}>
            <HomeSchedule schedules={schedules} onMonthChanged={handleScheduleMonthChanged}></HomeSchedule>
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
