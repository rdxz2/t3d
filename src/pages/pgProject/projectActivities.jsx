import React from 'react';

import CtxApi from '../../contexts/ctxApi';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import { Typography, Timeline } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ProjectActivities = ({ projectCode }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // activities
  const [activities, activitiesSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    svsT3dapi
      .sendRequest(`api/project/activities/${projectCode}`, HTTPMETHOD.GET)
      .then((response) => activitiesSet(response.data))
      .catch((error) => ({}));
  }, [projectCode, svsT3dapi]);

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
