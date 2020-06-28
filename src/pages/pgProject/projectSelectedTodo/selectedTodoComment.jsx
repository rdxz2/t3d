import React from 'react';
import CtxApi from '../../../contexts/ctxApi';
import { useHistory } from 'react-router';

const SelectedTodoComment = () => {
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

  return <div>SelectedTodoComment</div>;
};

export default SelectedTodoComment;
