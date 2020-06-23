import React from 'react';

import CmpTags from '../../../components/cmpTags';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';

const SelectedToDoTags = ({ toDo }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // submit: tags changed
  const handleTagsChanged = async (tags) => {
    try {
      // send request
      await svsT3dapi.sendRequest(`api/todo/tags/${toDo.id}`, HTTPMETHOD.POST, { tags });
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return <CmpTags initialValue={toDo.tags} onChange={handleTagsChanged}></CmpTags>;
};

export default SelectedToDoTags;
