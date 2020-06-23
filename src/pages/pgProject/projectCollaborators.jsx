import React from 'react';
import CtxApi from '../../contexts/ctxApi';
import { useHistory } from 'react-router';
import { Typography, Space, Popover } from 'antd';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import COLOR from '../../constants/COLOR';
import CmpMiniProfile from '../../components/cmpMiniProfile';
import CmpMiniProfileAsync from '../../components/cmpMiniProfileAsync';

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
    <Space direction='vertical' style={{ width: '100%' }}>
      {/* title */}
      <Typography.Title level={3}>Collaborators</Typography.Title>
      {/* online collaborator list */}
      {onlineCollaborators.map((onlineCollaborator, onlineCollaboratorIndex) => (
        <Popover key={onlineCollaboratorIndex} mouseEnterDelay={0.3} placement='top' content={<CmpMiniProfileAsync userId={onlineCollaborator.id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
          <Typography.Link>
            <SmileTwoTone twoToneColor={COLOR.GREEN}></SmileTwoTone> {onlineCollaborator.name}
          </Typography.Link>
        </Popover>
      ))}
      {/* offline collaborator list */}
      {offlineCollaborators.map((offlineCollaborator, offlineCollaboratorIndex) => (
        <Popover key={offlineCollaboratorIndex} mouseEnterDelay={0.3} placement='top' content={<CmpMiniProfileAsync userId={offlineCollaborator.id}></CmpMiniProfileAsync>} style={{ width: 400 }}>
          <Typography.Link>
            <SmileTwoTone twoToneColor={COLOR.RED}></SmileTwoTone> {offlineCollaborator.name}
          </Typography.Link>
        </Popover>
      ))}
    </Space>
  );
};

export default ProjectCollaborators;
