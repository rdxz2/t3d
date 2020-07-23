import './cmpUserAvatar.css';

import { Avatar } from 'antd';
import React from 'react';

import { makeNameInitials } from '../utilities/utlType';

const CmpUserAvatar = ({ size = 24, urlProfilePicture, profile, onClick = () => {} }) => {
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
    <Avatar size={size} src={urlProfilePicture && urlProfilePicture} className='user-avatar' shape='circle' onClick={onClick}>
      {!urlProfilePicture && makeNameInitials(profile.name)}
    </Avatar>
  );
};

export default CmpUserAvatar;
