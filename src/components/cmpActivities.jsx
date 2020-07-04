import { EllipsisOutlined } from '@ant-design/icons';
import './cmpActivities.css';
import { Button, Tag, Timeline, Typography } from 'antd';
import React from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';

import ACTIVITY from '../constants/ACTIVITY';
import TIMEFORMAT from '../constants/TIMEFORMAT';
import { convertIsoDateToMoment, makeEllipsis } from '../utilities/utlType';
import CmpRenderer from './cmpRenderer';
import { SELECTOPTION } from '../constants/SELECTOPTIONS';

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
    // ellipsize actor name
    const actorName = makeEllipsis(activity.actor?.name, 10);

    // ellipsize description
    const todoDescription = makeEllipsis(activity.todo_description);

    // project action
    if (activity.project_action)
      switch (activity.project_action) {
        // create -- {actor} created {project}
        case ACTIVITY.ACTION.CREATE:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
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
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> is doing </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // create tag -- {actor} tagged {tag} to {todo}
        case ACTIVITY.ACTION.CREATE_TAG:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> tagged </Typography.Text>
              <Tag>{activity.todo_tag}</Tag>
              <Typography.Text> to </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // delete tag -- {actor} untagged {tag} from {todo}
        case ACTIVITY.ACTION.DELETE_TAG:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> untagged </Typography.Text>
              <Tag>{activity.todo_tag}</Tag>
              <Typography.Text> from </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // edit description -- {actor} changed {old_description} to {new_description}
        case ACTIVITY.ACTION.EDIT_DESCRIPTION:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> changed </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
              <Typography.Text> to </Typography.Text>
              <Typography.Link strong>{activity.todo_description_new}</Typography.Link>
            </>
          );
        // edit detail
        case ACTIVITY.ACTION.EDIT_DETAIL:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> changed detail for </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // edit priority -- {actor} changed {old_priority} to {new_priority}
        case ACTIVITY.ACTION.EDIT_PRIORITY:
          const selectOptionTodoPriorityOld = SELECTOPTION.TODO_PRIORITY[activity.todo_priority];
          const selectOptionTodoPriorityNew = SELECTOPTION.TODO_PRIORITY[activity.todo_priority_new];

          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> changed </Typography.Text>
              <Tag color={selectOptionTodoPriorityOld.tagColor}>{selectOptionTodoPriorityOld.text}</Tag>
              <Typography.Text> to </Typography.Text>
              <Tag color={selectOptionTodoPriorityNew.tagColor}>{selectOptionTodoPriorityNew.text}</Tag>
              <Typography.Text> for </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // edit work date -- {actor} changed {description} work date to {date_start} - {date_end}
        case ACTIVITY.ACTION.EDIT_WORKDATE:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> changed </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
              <Typography.Text> work date to </Typography.Text>
              <Typography.Text strong>{convertIsoDateToMoment(activity.todo_date_start, TIMEFORMAT.DDMMMYY)}</Typography.Text>
              <Typography.Text> - </Typography.Text>
              <Typography.Text strong>{convertIsoDateToMoment(activity.todo_date_end, TIMEFORMAT.DDMMMYY)}</Typography.Text>
            </>
          );

        // mark completed -- {actor} completed {description}
        case ACTIVITY.ACTION.MARK_COMPLETED:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> completed </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // unmark completed -- {actor} opened {description}
        case ACTIVITY.ACTION.UNMARK_COMPLETED:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> opened </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
            </>
          );
        // mark important -- {actor} marked {description} as important
        case ACTIVITY.ACTION.MARK_IMPORTANT:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> marked </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
              <Typography.Text> as important </Typography.Text>
            </>
          );
        // unmark important -- {actor} marked {description} as unimportant
        case ACTIVITY.ACTION.UNMARK_IMPORTANT:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> marked </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
              <Typography.Text> as unimportant </Typography.Text>
            </>
          );
        // comment -- {actor} commented on {description}
        case ACTIVITY.ACTION.COMMENT:
          return (
            <>
              <Typography.Link strong>{actorName}</Typography.Link>
              <Typography.Text> commented on </Typography.Text>
              <Typography.Link strong>{todoDescription}</Typography.Link>
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
  const activitiesMapped = activities.data.map((activity) => {
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
  const isAllActivitiesLoaded = activities.data.length >= activities.totalDataFiltered;

  return (
    <div style={{ maxHeight: 'calc(50vh - 89px)', paddingTop: 10, overflowY: 'auto' }}>
      <Timeline id='timeline-project-activities' mode={mode}>
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
