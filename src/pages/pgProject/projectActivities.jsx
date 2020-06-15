import React from 'react';

import CtxApi from '../../contexts/ctxApi';

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
      .sendRequest('api/user/recentactivities')
      .then((response) => activitiesSet(response.data))
      .catch((error) => ({}));
  }, [svsT3dapi]);

  // END -- EFFECTS

  return (
    <>
      {activities.map((activity, activityIndex) => (
        <div>ac</div>
      ))}
    </>
  );
};

export default ProjectActivities;
