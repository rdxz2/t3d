import { SmileTwoTone } from '@ant-design/icons';
import { Popover, Space, Typography } from 'antd';
import React from 'react';

import './projectCollaborators.css';
import CmpMiniProfileAsync from '../../components/cmpMiniProfileAsync';
import COLOR from '../../constants/COLOR';

const ProjectCollaborators = ({ collaborators = [], onlineCollaborators = [] }) => {
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

  // get online collaborators id
  const onlineCollaboratorsId = onlineCollaborators.map((onlineCollaborator) => onlineCollaborator.id);

  // get offline collaborators
  const offlineCollaborators = collaborators.filter((collaborator) => !onlineCollaboratorsId.includes(collaborator.id));

  return (
    <Space direction='vertical'>
      {/* title */}
      <Typography.Title level={3}>Collaborators</Typography.Title>
      {/* online collaborator list */}
      {onlineCollaborators.map((onlineCollaborator, onlineCollaboratorIndex) => (
        <Popover key={onlineCollaboratorIndex} mouseEnterDelay={0.3} placement='top' content={<CmpMiniProfileAsync userId={onlineCollaborator.id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
          <Typography.Text className='collaborator-name' strong>
            <SmileTwoTone twoToneColor={COLOR.GREEN}></SmileTwoTone> {onlineCollaborator.name}
          </Typography.Text>
        </Popover>
      ))}
      {/* offline collaborator list */}
      {offlineCollaborators.map((offlineCollaborator, offlineCollaboratorIndex) => (
        <Popover key={offlineCollaboratorIndex} mouseEnterDelay={0.3} placement='top' content={<CmpMiniProfileAsync userId={offlineCollaborator.id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
          <Typography.Text className='collaborator-name' strong>
            <SmileTwoTone twoToneColor={COLOR.RED}></SmileTwoTone> {offlineCollaborator.name}
          </Typography.Text>
        </Popover>
      ))}
    </Space>
  );
};

export default ProjectCollaborators;
