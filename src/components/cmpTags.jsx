import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import React from 'react';

const CmpTags = ({ initialValue = [], onCreated, onDeleted }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // tags
  const [tags, tagsSet] = React.useState(initialValue);
  const [isChangingTagsFromProp, isChangingTagsFromPropSet] = React.useState(true);

  // creating state
  const [isCreating, isCreatingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle tag creating
  const handleCreatingTag = () => isCreatingSet(true);
  const handleNotCreatingTag = () => isCreatingSet(false);

  // delete tag
  const handleDeleteTag = (tagIndex) => {
    // set tags
    tagsSet((_tags) => {
      // find tag
      const deletedTag = _tags[tagIndex];

      // remove tag
      _tags.splice(tagIndex, 1);

      // send deleted data to caller
      onDeleted(deletedTag);

      // set state
      return [..._tags];
    });
  };

  // done creating tag
  const handleDoneCreatingTag = (event) => {
    // toggle creating tag off
    handleNotCreatingTag();

    // get value
    const tagName = event.target.value;

    // don't do any operations if value is empty
    if (!tagName) return;

    // set tags
    tagsSet((_tags) => {
      // insert new tag
      _tags.push(tagName);

      // send created  data to caller
      onCreated(tagName);

      // set state
      return _tags;
    });
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  React.useEffect(() => {
    // only change tags from prop on initialization
    if (isChangingTagsFromProp && initialValue) {
      tagsSet(initialValue);

      isChangingTagsFromPropSet(false);
    }
  }, [initialValue, isChangingTagsFromProp]);

  // END -- EFFECTS

  return (
    <>
      {/* tags */}
      {tags.map((tag, tagIndex) => (
        <Tag
          key={tagIndex}
          closable
          onClose={(event) => {
            event.preventDefault();
            handleDeleteTag(tagIndex);
          }}>
          {tag}
        </Tag>
      ))}
      {/* create new tag */}
      {isCreating ? (
        <Input autoFocus type='text' size='small' onBlur={handleDoneCreatingTag} onPressEnter={handleDoneCreatingTag} style={{ width: 86 }}></Input>
      ) : (
        <Tag onClick={handleCreatingTag}>
          <PlusOutlined></PlusOutlined> Create tag
        </Tag>
      )}
    </>
  );
};

export default CmpTags;
