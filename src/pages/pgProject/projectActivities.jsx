import React from 'react';

import CmpActivities from '../../components/cmpActivities';
import { Typography } from 'antd';

const ProjectActivities = ({ activities, activitiesSet, projectCode, onLoadMore }) => {
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
      <Typography.Title level={3}>Activities</Typography.Title>
      {/* activities timeline */}
      <CmpActivities activities={activities} onLoadMore={onLoadMore}></CmpActivities>
    </>
  );
};

export default ProjectActivities;
