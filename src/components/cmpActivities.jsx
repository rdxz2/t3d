import { Timeline, Typography, Tag, Button, Space } from 'antd';
import React from 'react';

import ACTIVITY from '../constants/ACTIVITY';
import TIMEFORMAT from '../constants/TIMEFORMAT';
import { convertIsoDateToMoment } from '../utilities/utlType';
import CmpRenderer from './cmpRenderer';
import { EllipsisOutlined } from '@ant-design/icons';

// get activity actions
const ACTIVITY_ACTION = ACTIVITY.ACTION;

const CmpActivities = ({ activities = {}, onLoadMore, mode = 'left' }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // current requested page
  const [currentPage, currentPageSet] = React.useState(1);

  // loading state
  const [isLoading, isLoadingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // load more activities
  const handleLoadMore = async () => {
    // loading...
    isLoadingSet(true);

    // increment current page
    const _currentPage = currentPage + 1;

    try {
      // send request trigger to caller
      const response = await onLoadMore(_currentPage);

      // set current page
      currentPageSet(_currentPage);
    } catch (error) {
    } finally {
      // not loading...
      isLoadingSet(false);
    }
  };

  // END -- FUNCTIONS

  // generate activity description
  const generateActivityDescription = (activity) => {
    // project action
    if (activity.project_action)
      switch (activity.project_action) {
        // create -- {actor} created {project}
        case ACTIVITY_ACTION.CREATE:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> created </Typography.Text>
              <Typography.Link strong>
                [{activity.project_code}] {activity.project_name}
              </Typography.Link>
            </>
          );
        // not recognized
        default:
      }
    // to do action
    else if (activity.todo_action)
      switch (activity.todo_action) {
        // create -- {actor} is is doing {project}
        case ACTIVITY_ACTION.CREATE:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> is doing </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
            </>
          );
        // create tag -- {actor} tagged {tag} to {todo}
        case ACTIVITY_ACTION.CREATE_TAG:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> tagged </Typography.Text>
              <Tag style={{ marginRight: 0 }}>{activity.todo_tag}</Tag>
              <Typography.Text> to </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
            </>
          );
        // delete tag -- {actor} untagged {tag} from {todo}
        case ACTIVITY_ACTION.DELETE_TAG:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> untagged </Typography.Text>
              <Tag style={{ marginRight: 0 }}>{activity.todo_tag}</Tag>
              <Typography.Text> from </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
            </>
          );
        default:
      }

    // activity not recognized
    return '';
  };

  // START -- EFFECTS

  // END -- EFFECTS

  // map activities
  const activitiesMapped = activities.projectActivities.map((activity) => {
    // get action name
    const activityAction = activity.project_action || activity.todo_action;

    // map object properties
    const activityMapped = {
      color: ACTIVITY.COLOR[activityAction],
      icon: <CmpRenderer component={ACTIVITY.ICON[activityAction]}></CmpRenderer>,
      date: convertIsoDateToMoment(activity.create_date, TIMEFORMAT.DDMMYYHHMMSS_BACKSLASH),
      description: generateActivityDescription(activity),
    };

    return activityMapped;
  });

  // check if all activities from server are loaded
  const isAllActivitiesLoaded = activities.projectActivities.length >= activities.projectActivitiesTotalData;

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* timeline */}
      <Timeline mode={mode} style={{ height: 'calc(50vh - 89px)', paddingTop: 10, overflowY: 'scroll' }}>
        {activitiesMapped.map((activity, activityIndex) => (
          <Timeline.Item key={activityIndex} color={activity.color}>
            {/* {date}: {description} */}
            {activity.date}: {activity.description}
          </Timeline.Item>
        ))}
      </Timeline>
      {/* load more button */}
      {!isAllActivitiesLoaded && (
        <Button block loading={isLoading} type='dashed' icon={<EllipsisOutlined></EllipsisOutlined>} onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </Space>
  );
};

export default CmpActivities;
