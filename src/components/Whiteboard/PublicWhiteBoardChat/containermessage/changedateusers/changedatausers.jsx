import React, { useState, Fragment, useRef } from 'react';
import axios from 'axios';
import { BarLoader } from 'react-spinners';

import cameraIconS from '../../chat-assets/chat-icons/cammera-icon-smaller.svg';
import textblueIconS from '../../chat-assets/chat-icons/letter-t-icon-smaller.svg';
import textwhiteIconS from '../../chat-assets/chat-icons/letter-tcolor-icon-smaller.svg';
import userIconS from '../../chat-assets/chat-icons/human-icon-smaller.svg';
import folderIconS from '../../chat-assets/chat-icons/folder-icon-smaller.svg';
import blueCircleIconS from '../../chat-assets/chat-icons/blue-circle-smaller.svg';
import fusciaCircleIconS from '../../chat-assets/chat-icons/fuscia-circle-smaller.svg';
import Webcam from 'react-webcam';

import '../../PublicChat.css';
import { USER_ROLES } from 'enums/constants.enum';
import { useUserRole } from 'services/cognito.service';
import { useSocket } from '../../../../../providers/SocketProvider';

const Changedatausers = ({
  setImageurl,
  avatarStatus,
  changeTextColor,
  classRoomId,
  ownerMode,
  setChangedata
}) => {
  const { publicSocket: socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const webcamref = useRef();
  const [CameraModal, setCameraModal] = useState(false);
  const [AcceptDelete, setAcceptDelete] = useState(false);

  const userRole = useUserRole();

  const uploadImage = async e => {
    const files = e;
    const formData = new FormData();
    formData.append('upload_preset', 't9sztu2i');
    formData.append('file', files);
    axios
      .post('https://api.cloudinary.com/v1_1/dnpyajslp/image/upload', formData)
      .then(setLoading(true))
      .then(res => {
        setImageurl(res.data.secure_url);
        setLoading(false);
        setCameraModal(false);
      })
      .catch(err => console.log(err));
  };

  const uploadImage2 = async e => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 't9sztu2i');
    formData.append('file', files);
    axios
      .post('https://api.cloudinary.com/v1_1/dnpyajslp/image/upload', formData)
      .then(setLoading(true))
      .then(res => {
        setImageurl(res.data.secure_url);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  const deleteFunction = () => {
    socket.emit('whiteboard:deleteMessages', { roomid: classRoomId });
    setAcceptDelete(false);
  };

  const toggleCamera = e => {
    setCameraModal(!CameraModal);
  };

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: 'user'
  };

  return (
    <Fragment>
      {CameraModal && (
        <div className="camera-input">
          <button
            style={{
              background: 'transparent',
              border: 'transparent',
              width: 'fit-content',
              color: '#fff'
            }}
            onClick={toggleCamera}
          >
            Cancel
          </button>
          <div className="ci-webcam-container">
            <div
              style={{
                width: 200,
                height: 200,
                marginTop: 20,
                borderRadius: '50%',
                backgroundColor: '#7a7a7a'
              }}
            >
              <Webcam
                audio={false}
                style={{
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '50%'
                }}
                screenshotFormat="image/jpeg"
                ref={webcamref}
                videoConstraints={videoConstraints}
                onUserMediaError={e => alert(e)}
              />
            </div>
            <button
              onClick={() => uploadImage(webcamref.current.getScreenshot())}
              className="CameraSaveButton"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {AcceptDelete && (
        <div className="AcceptDelete">
          <p className="accept-delete-title">Are you sure to delete all messages?</p>
          <div className="accept-buttons">
            <p
              className="accept-delete-button"
              onClick={() => setAcceptDelete(false)}
              style={{ alignSelf: 'flex-start' }}
            >
              cancel
            </p>
            <p
              onClick={deleteFunction}
              className="accept-delete-button"
              style={{ alignSelf: 'flex-end' }}
            >
              proceed
            </p>
          </div>
        </div>
      )}
      <div className="changeuserdata">
        <span className="divclose" onClick={e => setChangedata(false)}>
          X
        </span>
        <div className="gbandtext icon-3px">
          <label onClick={toggleCamera} htmlFor="camerainput">
            <img src={cameraIconS} alt="" />
          </label>
        </div>

        <div className="gbandtext icon-3px">
          <label htmlFor="inputfile3">
            <img src={folderIconS} alt="" />
          </label>
          <input
            hidden
            id="inputfile3"
            type="file"
            name="file"
            onChange={e => uploadImage2(e)}
          />
        </div>

        <div className="gbandtext">
          <img
            className="img-icon-efect"
            src={userIconS}
            onClick={_ => avatarStatus(true)}
            alt=""
          />
        </div>

        <div className="gbandtext">
          <img
            src={ownerMode ? blueCircleIconS : fusciaCircleIconS}
            alt=""
            onClick={_ => avatarStatus(false)}
          />
        </div>

        <div className="gbandtext">
          <img src={textblueIconS} alt="" onClick={_ => changeTextColor('white')} />
        </div>

        <div className="gbandtext">
          <img src={textwhiteIconS} alt="" onClick={_ => changeTextColor('alternado')} />
        </div>
        {[USER_ROLES.TEACHERS].includes(userRole) && (
          <div className="gbandtext" onClick={() => setAcceptDelete(true)}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA8UlEQVRoge3aSw6DIBSFYWwaF9XH8uxjXTVNF1Ldxt+BOqhWxQh6bc43RAL3AHECzsmfAlLgDpSMK4ArkK5ddwdw8wjQdlm77o56lQEOHn2Pzc4sUdskzRLH6j9mF2qgtSVDH4GHc+60UC1j8iRJzn0ft7Qj849h6PMcY94t7cggBbFGQdqAF/Cc2x6Vz9+jr8/U9ql9Gjpa1iiINQpijYJYoyDWKIg1CmKNglijINYoiDUKYo2CWLMPOFbuft9hTG2PR/cjC1IQa3yDlM5VF/0Ra/kCNLfJ4R4VUL0bWUsWMkhahylGJg3pDWRYfHgjHj7hyv7MjZJBZgAAAABJRU5ErkJggg=="
              alt=""
              style={{ width: 35, height: 35 }}
            />
          </div>
        )}
      </div>
      <div className="loading">
        <BarLoader size={1} color={'#7b94a7'} loading={loading} width={'100%'} />
      </div>
    </Fragment>
  );
};

export default Changedatausers;
