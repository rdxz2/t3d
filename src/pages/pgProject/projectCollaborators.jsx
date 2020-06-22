import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Typography, Space } from 'antd';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
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

  // get offline collaborators
  const offlineCollaborators = collaborators.filter((collaborator) => !onlineCollaborators.includes(collaborator));

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* title */}
      <Typography.Title level={3}>Collaborators</Typography.Title>
      {/* online collaborator list */}
      {onlineCollaborators.map((onlineCollaborator, onlineCollaboratorIndex) => (
        <Typography.Text key={onlineCollaboratorIndex} strong>
          <SmileTwoTone twoToneColor={COLOR.GREEN}></SmileTwoTone> {onlineCollaborator}
        </Typography.Text>
      ))}
      {/* offline collaborator list */}

      {offlineCollaborators.map((offlineCollaborator, offlineCollaboratorIndex) => (
        <Typography.Text key={offlineCollaboratorIndex} strong>
          <SmileTwoTone twoToneColor={COLOR.RED}></SmileTwoTone> {offlineCollaborator}
        </Typography.Text>
      ))}
    </Space>
  );
};

export default ProjectCollaborators;
