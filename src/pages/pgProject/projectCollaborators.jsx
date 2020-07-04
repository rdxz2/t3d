import { SmileTwoTone } from '@ant-design/icons';
import { Popover, Space, Typography } from 'antd';
import React from 'react';

import './projectCollaborators.css';
import _ from 'lodash';
import CmpMiniProfileAsync from '../../components/cmpMiniProfileAsync';
import COLOR from '../../constants/COLOR';

const ProjectCollaborators = ({ collaborators = [] }) => {
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

  // sort collaborator by online state
  const collaboratorsSorted = _.orderBy(collaborators, ['isOnline'], ['desc']);

  return (
    <Space direction='vertical'>
      {/* title */}
      <Typography.Title level={3}>Collaborators</Typography.Title>
      {/* collaborator list */}
      {collaboratorsSorted.map((collaborator, collaboratorIndex) => (
        <Popover key={collaboratorIndex} mouseEnterDelay={0.3} placement='top' content={<CmpMiniProfileAsync userId={collaborator.id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
          <Typography.Text className='collaborator-name' strong>
            <SmileTwoTone twoToneColor={collaborator.isOnline ? COLOR.GREEN : COLOR.RED}></SmileTwoTone> {collaborator.name}
          </Typography.Text>
        </Popover>
      ))}
    </Space>
  );
};

export default ProjectCollaborators;
