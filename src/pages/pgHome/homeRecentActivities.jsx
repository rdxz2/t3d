import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Timeline, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const HomeRecentActivities = () => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      <Typography.Title level={3}>Recent Activities</Typography.Title>
      <Timeline mode='left'>
        <Timeline.Item color='green'>a</Timeline.Item>
        <Timeline.Item color='green'>b</Timeline.Item>
        <Timeline.Item>
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </Timeline.Item>
        <Timeline.Item color='red' dot={<UserOutlined></UserOutlined>}>
          Content
        </Timeline.Item>
        <Timeline.Item>Content</Timeline.Item>
        <Timeline.Item color='gray'>Content</Timeline.Item>
      </Timeline>
    </>
  );
};

export default HomeRecentActivities;
