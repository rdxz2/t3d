import { Avatar } from 'antd';
import React from 'react';

import CmpDetail from '../components/cmpDetail';

const LayMiniProfile = ({ profile, nameInitials }) => {
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

  return (
    <div style={{ width: 300 }}>
      {/* user's avatar */}
      <div style={{ textAlign: 'center' }}>
        <Avatar size={64}>{nameInitials}</Avatar>
      </div>
      {/* username */}
      <CmpDetail label='Username' value={profile.username}></CmpDetail>
      {/* name */}
      <CmpDetail label='Name' value={profile.name}></CmpDetail>
      {/* department */}
      <CmpDetail label='Department' value={profile.department.name}></CmpDetail>
      {/* position */}
      <CmpDetail label='Position' value={profile.position.name}></CmpDetail>
    </div>
  );
};

export default LayMiniProfile;
