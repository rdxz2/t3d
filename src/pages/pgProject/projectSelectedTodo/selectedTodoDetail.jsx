import './selectedTodoDetail.css';
import 'braft-editor/dist/index.css';

import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row, Skeleton, Space } from 'antd';
import BraftEditor from 'braft-editor';
import { Markup } from 'interweave';
import React from 'react';

import COLOR from '../../../constants/COLOR';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';
import { isEmptyObject } from '../../../utilities/utlType';

const SelectedTodoDetail = ({ todo = {}, handleDetailEdited }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // braft editor state
  const [braftEditorState, braftEditorStateSet] = React.useState();
  const [isChangingDetailFromProp, isChangingDetailFromPropSet] = React.useState(true);

  // editing state
  const [isEditingDetail, isEditingDetailSet] = React.useState(false);

  // saving state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // content change
  const handleChange = (_braftEditorState) => braftEditorStateSet(_braftEditorState);

  // toggle editing state
  const handleToggleEditingOn = () => isEditingDetailSet(true);
  const handleToggleEditingOff = () => isEditingDetailSet(false);

  // submit: save detail
  const handleSubmit = async () => {
    // do nothing if content is empty
    if (!braftEditorState) return;

    // convert editor content to html string
    const htmlString = braftEditorState.toHTML();

    // do nothing if content is empty
    if (htmlString === '<p></p>') return;

    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/detail/${todo.id}`, HTTPMETHOD.POST, { detail: htmlString });

      // run callback
      handleDetailEdited(response);

      // toggle editing off
      handleToggleEditingOff();
    } catch (error) {
    } finally {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // render detail as jsx
  const renderDetailAsJsx = (_braftEditorState) => {
    // don't render anything if detail state is null
    if (!_braftEditorState) return null;

    // convert braft editor state to html string, then force render it in a div
    return (
      <div id='todo-detail' onClick={handleToggleEditingOn}>
        <Markup content={_braftEditorState.toHTML()}></Markup>
      </div>
    );
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change detail from prop on initialization
    if (isChangingDetailFromProp && todo.detail) {
      // create braft editor state
      const _braftEditorState = BraftEditor.createEditorState(todo.detail);

      // set braft editor state
      braftEditorStateSet(_braftEditorState);

      isChangingDetailFromPropSet(false);
    }
  }, [isChangingDetailFromProp, todo.detail]);

  // END -- EFFECTS

  return isEditingDetail ? (
    <Space direction='vertical' style={{ width: '100%' }}>
      <BraftEditor
        language='en'
        placeholder='To do detail ...'
        controls={[
          'font-family',
          'font-size',
          'text-color',
          'separator',
          'subscript',
          'superscript',
          'list-ol',
          'list-ul',
          'separator',
          'text-align',
          'separator',
          'bold',
          'italic',
          'underline',
          'link',
          'strike-through',
          'separator',
          'table',
          'code',
          'blockquote',
          'separator',
          'emoji',
          'hr',
          'separator',
          'media',
        ]}
        readOnly={isSubmitting}
        value={braftEditorState}
        onChange={handleChange}
        onSave={handleSubmit}
        style={{ border: 1, borderRadius: 2, borderStyle: 'solid', borderColor: COLOR.GREY_LIGHT }}></BraftEditor>
      {/* action button */}
      <Row gutter={8}>
        {/* cancel button */}
        <Col span={12}>
          <Button block icon={<CloseOutlined></CloseOutlined>} onClick={handleToggleEditingOff}></Button>
        </Col>
        {/* save button */}
        <Col span={12}>
          <Button block type='primary' loading={isSubmitting} icon={<SaveOutlined></SaveOutlined>} onClick={handleSubmit}></Button>
        </Col>
      </Row>
    </Space>
  ) : (
    <>
      {/* html content */}
      {isEmptyObject(todo) ? <Skeleton active></Skeleton> : renderDetailAsJsx(braftEditorState)}
      {/* toggle edit button */}
      {/* <Button type='primary' onClick={handleToggleEditingOn}>
        Edit detail
      </Button> */}
    </>
  );
};

export default SelectedTodoDetail;
