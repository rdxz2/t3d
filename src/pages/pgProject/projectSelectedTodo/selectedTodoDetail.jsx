import './selectedTodoDetail.css';
import 'braft-editor/dist/index.css';

import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import BraftEditor from 'braft-editor';
import React from 'react';

import COLOR from '../../../constants/COLOR';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import CtxApi from '../../../contexts/ctxApi';

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

  // saving state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // content change
  const handleChange = (_braftEditorState) => braftEditorStateSet(_braftEditorState);

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
    } catch (error) {
    } finally {
      // not submitting...
      isSubmittingSet(false);
    }
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

  return (
    <>
      {/* rich text editor */}
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
      {/* save button */}
      <Button block type='primary' loading={isSubmitting} icon={<SaveOutlined></SaveOutlined>} onClick={handleSubmit}></Button>
    </>
  );
};

export default SelectedTodoDetail;
