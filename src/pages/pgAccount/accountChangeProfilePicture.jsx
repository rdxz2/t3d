import { SaveOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Space, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

import CmpUserAvatar from '../../components/cmpUserAvatar';
import CONTENTTYPE from '../../constants/CONTENTTYPE';
import FILEEXTENSION from '../../constants/FILEEXTENSION';
import FILESIZE from '../../constants/FILESIZE';
import HTTPMETHOD from '../../constants/HTTPMETHOD';
import CtxApi from '../../contexts/ctxApi';

const AccountChangeProfilePicture = ({ profile, urlProfilePicture, handleChangeProfilePictureUrl }) => {
  // START -- CONTEXTS

  // api
  const { svsT3dapi } = React.useContext(CtxApi);

  // END -- CONTEXTS

  // START -- OTHERS

  // file browser ref
  const refProfilePicture = React.useRef();

  // END -- OTHERS

  // START -- STATES

  // picture
  const [fileProfilePicture, fileProfilePictureSet] = React.useState({});
  const [objectUrlProfilePicture, objectUrlProfilePictureSet] = React.useState();

  // changing profile picture state
  const [isChangingProfilePicture, isChangingProfilePictureSet] = React.useState(false);

  // submitting state
  const [isSubmitting, isSubmittingSet] = React.useState(false);

  // END -- STATES

  // START -- FUNCTIONS

  // toggle changing profile picture
  const handleChangingProfilePicture = () => isChangingProfilePictureSet(true);
  const handleNotChangingProfilePicture = () => isChangingProfilePictureSet(false);

  // open file browser
  const handleOpenFileBrowser = () => refProfilePicture.current.click();

  // picture selected
  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // get the file
    const file = event.target.files[0];

    // do nothing if no file selected
    if (!file) return;

    // START -- VALIDATE FILE

    // file type
    if (![CONTENTTYPE.JPG, CONTENTTYPE.PNG].includes(file.type)) return message.error('wrong file type');
    // file size
    if (file.size / FILESIZE.MB > 2) return message.error('file size must be smaller than 2MB');

    // END -- VALIDATE FILE

    // set state
    fileProfilePictureSet(file);

    // generate object url for image preview
    objectUrlProfilePictureSet(URL.createObjectURL(file));
  };

  // submit (change profile picture)
  const handleSubmit = async () => {
    // create new form data (list of file)
    const formData = new FormData();

    // append profile picture
    formData.append('profile_picture', fileProfilePicture);

    // submitting...
    isSubmittingSet(true);

    try {
      // send request
      const response = await svsT3dapi.sendRequest('api/user/profilepicture', HTTPMETHOD.POST, formData, { additionalHeaders: { 'Content-Type': CONTENTTYPE.FORMDATA } });

      // display message
      message.success('Profile picture changed');

      // chang global profile picture url
      handleChangeProfilePictureUrl(response.url_profile_picture);
    } catch (error) {
    } finally {
      // not submitting...
      isSubmittingSet(false);
    }
  };

  // END -- FUNCTIONS

  // START -- EFFECTS

  // END -- EFFECTS

  return (
    <>
      {/* show modal button */}
      <CmpUserAvatar size={80} urlProfilePicture={urlProfilePicture} profile={profile} onClick={handleChangingProfilePicture}></CmpUserAvatar>
      {/* modal */}
      <Modal footer={null} visible={isChangingProfilePicture} title='Change profile picture' onCancel={handleNotChangingProfilePicture}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {/* profile picture preview */}
          {objectUrlProfilePicture || urlProfilePicture ? (
            // render image if available
            <img id='upload-profile-picture-preview' src={objectUrlProfilePicture || urlProfilePicture} alt={profile.name} onClick={handleOpenFileBrowser} style={{ width: '100%' }}></img>
          ) : (
            // render placeholder if not available
            <div id='upload-profile-picture-empty' onClick={handleOpenFileBrowser}>
              <div id='upload-profile-picture-text'>
                <div>
                  <UserOutlined style={{ fontSize: 48 }}></UserOutlined>
                </div>
                <div>Show yourself so other will recognize you!</div>
              </div>
            </div>
          )}
          {/* selected file */}
          {fileProfilePicture.name && (
            <Typography.Text>
              Selected file: <Typography.Text strong>{fileProfilePicture.name}</Typography.Text>
            </Typography.Text>
          )}
          {/* save button */}
          <Button block loading={isSubmitting} disabled={!fileProfilePicture.name} type='primary' onClick={handleSubmit} icon={<SaveOutlined></SaveOutlined>}></Button>
          {/* hidden uploader */}
          <input hidden type='file' accept={`${FILEEXTENSION.DOT_PNG},${FILEEXTENSION.DOT_JPG}`} ref={refProfilePicture} onChange={handleChange}></input>
        </Space>
      </Modal>
    </>
  );
};

export default AccountChangeProfilePicture;
