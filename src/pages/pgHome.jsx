import './pgHome.css';

import { Col, Row, Space } from 'antd';
import React from 'react';

import HomeCalendar from './pgHome/homeCalendar';
import HomeProjects from './pgHome/homeProjects';
import HomeRecentActivities from './pgHome/homeRecentActivities';
import PADDING from '../constants/PADDING';

const PgHome = ({ match, handleChangeActivePage }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // change active page
  React.useEffect(() => {
    handleChangeActivePage('Home');
  }, [handleChangeActivePage]);

  // END -- EFFECTS

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* project */}
      <HomeProjects match={match}></HomeProjects>
      {/* calendar & activities */}
      <section style={{ ...PADDING.LEFT_RIGHT() }}>
        <Row gutter={16}>
          {/* recent activities */}
          <Col span={8}>
            <HomeRecentActivities></HomeRecentActivities>
          </Col>
          {/* calendar */}
          <Col span={16}>
            <HomeCalendar></HomeCalendar>
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
