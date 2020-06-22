import { UserOutlined } from '@ant-design/icons';
import { Timeline, Typography } from 'antd';
import React from 'react';

const ProjectActivities = ({ projectCode }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      {/* <Typography.Title level={3}>Project activities</Typography.Title> */}
      {/* activities */}
      {/* {activities.map((activity, activityIndex) => (
        <div>ac</div>
      ))} */}

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

export default ProjectActivities;
