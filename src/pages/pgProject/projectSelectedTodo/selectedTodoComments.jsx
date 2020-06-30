import { Comment, Tooltip, Typography, Input, Space, Button, Mentions, message } from 'antd';
import moment from 'moment';
import React from 'react';
import './selectedTodoComments.css';
import HTTPMETHOD from '../../../constants/HTTPMETHOD';
import TIMEFORMAT from '../../../constants/TIMEFORMAT';
import CtxApi from '../../../contexts/ctxApi';
import { isEmptyArray, makeNameInitials } from '../../../utilities/utlType';

const TodoComment = ({ comment = {}, handleReply, children }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // END -- STATES

  // START -- FUNCTIONS

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  // construct moment object for create date
  const createDate = moment(comment.create_date);

  // make commenter name initials
  const commenterNameInitials = makeNameInitials(comment.commenter.name);

  return (
    <Comment
      className='todo-comment'
      // actions={[<span>Reply</span>]}
      author={comment.commenter.name}
      avatar={<Button shape='circle'>{commenterNameInitials}</Button>}
      content={comment.description}
      datetime={
        <Tooltip title={createDate.format(TIMEFORMAT.DDMMMMYYYYHHMMSS)}>
          <span>{createDate.fromNow()}</span>
        </Tooltip>
      }>
      {children}
    </Comment>
  );
};

const SelectedTodoComments = ({ todo = {}, unshiftProjectActivities, unshiftTodoActivities }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi, strmProject } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // comments
  const [comments, commentsSet] = React.useState([]);
  const [isChangingCommentsFromProp, isChangingCommentsFromPropSet] = React.useState(true);

  // user comment value
  const [commentValue, commentValueSet] = React.useState('');

  // available user to be mentioned
  const [mentionsUser, mentionsUserSet] = React.useState({ isLoading: true, data: [] });

  // END -- STATES

  // START -- FUNCTIONS

  // prepare initial data
  const prepareInitialData = React.useCallback(async () => {
    // do nothing if project code is empty
    if (!todo.projectCode) return;

    try {
      // populate mentions list: user
      const responseMentionsUser = await svsT3dapi.sendRequestSelectList(`projectuser/${todo.projectCode}`);

      // set mentions
      mentionsUserSet((_mentions) => ({ isLoading: false, data: responseMentionsUser.data }));
    } catch (error) {}
  }, [svsT3dapi, todo.projectCode]);

  // render comments
  const renderComments = (_comments = []) => {
    // render each comment
    return _comments.map((comment, commentIndex) => {
      // render comment
      return (
        <TodoComment key={commentIndex} comment={comment} handleReply={handleReply}>
          {/* if this comment has replies (children) then render them as comments */}
          {!isEmptyArray(_comments.children) && renderComments(comment.children)}
        </TodoComment>
      );
    });
  };

  // comment input changed
  const handleCommentChange = (value) => {
    console.log('comment change', value);

    // set comment
    commentValueSet(value);
  };

  // mention changed
  const handleMentionSelected = (mentioned) => {
    // search for user to be mentioned
    const mentionedUser = mentionsUser.data.find((user) => user.name === mentioned.value);
    if (!mentionsUser) return message.error(`user ${mentioned.value} not found`);

    // append mentioned users
  };

  // submit: comment/reply
  const handleSubmit = async (description, parent) => {
    // get all mentioned users
    const mentionedUsers = description.match(/__@([^__]*)__/gi).map((mentionedUser) => mentionedUser.replace(/__@|__/g, ''));
    const mentionedUsersId = mentionedUsers.map((mentionedUser) => mentionsUser.data.find((mentionUser) => mentionUser.name === mentionedUser)?.id);

    console.log('submitting', mentionedUsersId);

    return;
    try {
      // reset comment
      commentValueSet('');

      // send request
      const response = await svsT3dapi.sendRequest(`api/todo/comment/${todo.id}`, HTTPMETHOD.POST, { description, parent });

      // destructure response data
      const { comment: newComment, activity: newActivity } = response.data;

      // broadcast: comment
      strmProject.emitTodoCommenting({ projectCode: todo.projectCode, comment: newComment, activity: newActivity }, () => {});
    } catch (error) {
      throw error;
    }
  };

  // submit: comment
  const handleComment = async () => {
    // don't do anything if value is empty
    if (!commentValue) return;

    try {
      // send request
      await handleSubmit(commentValue);
    } catch (error) {}
  };

  // submit: reply
  const handleReply = async (event, parent) => {
    // don't do anything if value is empty
    if (!event.target.value) return;

    try {
      // send request
      await handleSubmit(event.target.value, parent);
    } catch (error) {}
  };

  // other user commented (socket)
  const handleCommentedEmit = React.useCallback(
    (response) => {
      const { comment: newComment, activity: newActivity } = response;

      // set comment
      // search parent if exist
      commentsSet((_comments) => {
        // if this comment is not a reply then just push to the end
        if (!newComment.parent) _comments.push(newComment);
        // if this comment is a reply then add to the replied comment
        else {
          // // search for parent comment
          // const parentComment = _comments;
          // // append to parent comment
          // parentComment.children.push(newComment);
        }

        // set state
        return [..._comments];
      });

      // append activity (project)
      unshiftProjectActivities(newActivity);

      // append activity (to do)
      unshiftTodoActivities(newActivity);
    },
    [unshiftProjectActivities, unshiftTodoActivities]
  );

  // END -- FUNCTIONS

  // START -- EFFECTS

  // prepare initial data
  React.useEffect(() => {
    prepareInitialData();
  }, [prepareInitialData]);

  React.useEffect(() => {
    // only change comments from prop on initialization
    if (isChangingCommentsFromProp && todo.comments) {
      // set comments
      commentsSet(todo.comments);

      isChangingCommentsFromPropSet(false);
    }
  }, [isChangingCommentsFromProp, todo.comments]);

  React.useEffect(() => {
    // subscribe to server emits
    strmProject.registerTodoCommented(handleCommentedEmit);

    return () => {
      // unsubscribe from server emits
      strmProject.unregisterTodoCommented();
    };
  }, [handleCommentedEmit, strmProject]);

  // END -- EFFECTS

  return (
    <>
      {/* title */}
      <Typography.Title level={4}>Comments</Typography.Title>
      {/* comments */}
      <Space direction='vertical' style={{ width: '100%' }}>
        {/* comments */}
        <div id='todo-comments' style={{ maxHeight: '30vh', overflowY: 'scroll' }}>
          {renderComments(comments)}
        </div>
        {/* create a comment */}
        <Mentions rows={1} split='__' placeholder='Say something...' value={commentValue} onChange={handleCommentChange} onSelect={handleMentionSelected}>
          {mentionsUser.data.map((user, userIndex) => (
            <Mentions.Option key={userIndex} value={user.name}>
              {user.name}
            </Mentions.Option>
          ))}
        </Mentions>
        {/* comment button */}
        <Button type='primary' disabled={!commentValue} onClick={handleComment}>
          Add comment
        </Button>
      </Space>
    </>
  );
};

export default SelectedTodoComments;
