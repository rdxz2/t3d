import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';

const ProjectActivities = ({ projectCode }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // history
  const history = useHistory();

  // END -- OTHERS

  // START -- STATES

  // activities
  const [activities, activitiesSet] = React.useState([]);

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return <div>ProjectActivities</div>;
};

export default ProjectActivities;
