import { Modal, Select, Space, Typography } from 'antd';
import _, { values } from 'lodash';
import React from 'react';

import HTTPMETHOD from '../../constants/HTTPMETHOD';
import INPUTSELECT from '../../constants/INPUTSELECT';
import CtxApi from '../../contexts/ctxApi';
import CmpTags from '../../components/cmpTags';
import SELECTOPTIONS from '../../constants/SELECTOPTIONS';

const ProjectSelectedToDo = ({ match, history }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // to do
  const [toDo, toDoSet] = React.useState({});

  // modal visible state
  const [isModalVisible, isModalVisibleSet] = React.useState(true);

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // send request (to do detail)
    const responseToDoDetail = await svsT3dapi.sendRequest(`api/todo/detail/${match.params.id}`, HTTPMETHOD.GET);

    // set to do detail
    toDoSet(responseToDoDetail.data);

    // send request (select level)

    //
  }, [match.params.id, svsT3dapi]);

  // close modal
  const handleCloseModal = () => isModalVisibleSet(false);
  const handleRedirectToBefore = () => history.goBack();

  // tags changed
  const handleTagsChanged = async (tags) => {
    try {
      // send request
      await svsT3dapi.sendRequest(`api/todo/tags/${match.params.id}`, HTTPMETHOD.POST, { tags });
    } catch (error) {}
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  // END -- EFFECTS

  return (
    <Modal destroyOnClose footer={null} visible={isModalVisible} onCancel={handleCloseModal} afterClose={handleRedirectToBefore}>
      <Space direction='vertical'>
        <Space>
          {/* completed checkbox */}
          {/* <Checkbox defaultChecked={toDo.is_completed} onChange={handleToggleToDoCompleted}></Checkbox> */}
          {/* important flag */}
          {/* <StarTwoTone className='star' twoToneColor={isImportant ? COLOR.YELLOW : COLOR.GREY} onClick={handleToggleToDoImportant}></StarTwoTone> */}
          {/* description */}
          <Typography.Text
            editable={{
              onChange: (value) => {
                console.log('edit desc:', value);
              },
            }}>
            {toDo.description}
          </Typography.Text>
        </Space>
        {/* tags */}
        <CmpTags initialValue={toDo.tags} onChange={handleTagsChanged}></CmpTags>
        {/* priority */}
        <Select>
          {SELECTOPTIONS.TODO_PRIORITY.map((priority, priorityIndex) => (
            <Select.Option key={priorityIndex} value={priority.value}>
              {priority.text}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </Modal>
  );
};

export default ProjectSelectedToDo;
