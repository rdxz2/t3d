import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Timeline, Typography } from 'antd';
import React from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';

import ACTIVITY from '../constants/ACTIVITY';
import TIMEFORMAT from '../constants/TIMEFORMAT';
import { convertIsoDateToMoment } from '../utilities/utlType';
import CmpRenderer from './cmpRenderer';

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
      await onLoadMore(_currentPage);

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
        case ACTIVITY.ACTION.CREATE:
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
        case ACTIVITY.ACTION.CREATE:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> is doing </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
            </>
          );
        // create tag -- {actor} tagged {tag} to {todo}
        case ACTIVITY.ACTION.CREATE_TAG:
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
        case ACTIVITY.ACTION.DELETE_TAG:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> untagged </Typography.Text>
              <Tag style={{ marginRight: 0 }}>{activity.todo_tag}</Tag>
              <Typography.Text> from </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
            </>
          );
        // edit description -- {actor} changed {old_description} to {new_description}
        case ACTIVITY.ACTION.EDIT_DESCRIPTION:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text> changed </Typography.Text>
              <Typography.Link strong>{activity.todo_description}</Typography.Link>
              <Typography.Text> to </Typography.Text>
              <Typography.Link strong>{activity.todo_description_new}</Typography.Link>
            </>
          );
        // edit priority -- {actor} changed {old_priority} to {new_priority}
        case ACTIVITY.ACTION.EDIT_PRIORITY:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text>asd</Typography.Text>
            </>
          );
        // edit priority -- {actor} completed {description}
        case ACTIVITY.ACTION.MARK_COMPLETED:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text>asd</Typography.Text>
            </>
          );
        // edit priority -- {actor} opened {description}
        case ACTIVITY.ACTION.UNMARK_COMPLETED:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text>asd</Typography.Text>
            </>
          );
        // edit priority -- {actor} marked {description} as important
        case ACTIVITY.ACTION.MARK_IMPORTANT:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text>asd</Typography.Text>
            </>
          );
        // edit priority -- {actor} marked {description} as unimportant
        case ACTIVITY.ACTION.UNMARK_IMPORTANT:
          return (
            <>
              <Typography.Link strong>{activity.actor.name}</Typography.Link>
              <Typography.Text>asd</Typography.Text>
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
    <div style={{ height: 'calc(50vh - 89px)', paddingTop: 10, overflowY: 'scroll' }}>
      <Timeline mode={mode}>
        {activitiesMapped.map((activity, activityIndex) => (
          <Timeline.Item key={activityIndex} color={activity.color} /* dot={activity.icon} */>
            {/* {date}: {description} */}
            <strong>{activity.date}</strong>: {activity.description}
          </Timeline.Item>
        ))}
        {/* load more button */}
        {!isAllActivitiesLoaded && (
          <Button block loading={isLoading} type='dashed' icon={<EllipsisOutlined></EllipsisOutlined>} onClick={handleLoadMore} style={{ marginTop: 16 }}>
            Load more
          </Button>
        )}
      </Timeline>
    </div>
  );
};

export default CmpActivities;
