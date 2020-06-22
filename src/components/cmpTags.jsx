import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import React from 'react';

const CmpTags = ({ initialValue = [], onChange }) => {
  // START -- CONTEXTS

  // END -- CONTEXTS

  // START -- OTHERS

  // END -- OTHERS

  // START -- STATES

  // tags
  const [tags, tagsSet] = React.useState(initialValue);

  // creating state
  const [isCreating, isCreatingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle tag creating
  const handleCreatingTag = () => isCreatingSet(true);
  const handleNotCreatingTag = () => isCreatingSet(false);

  // delete tag
  const handleDeleteTag = (tagName) => {
    // set tags
    tagsSet((_tags) => {
      // find tag
      const tagIndex = _tags.indexOf(tagName);

      // remove tag
      _tags.splice(tagIndex, 1);

      // send all data to caller
      onChange(_tags);

      // set state
      return _tags;
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

      // send all data to caller
      onChange(_tags);

      // set state
      return _tags;
    });
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // initial value changed
  React.useEffect(() => {
    tagsSet(initialValue);
  }, [initialValue]);

  // END -- EFFECTS

  return (
    <>
      {/* tags */}
      {tags.map((tag, tagIndex) => (
        <Tag key={tagIndex} closable onClose={handleDeleteTag}>
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
