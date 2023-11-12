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

import cameraIcon from '../../chat-assets/chat-icons/cammera-icon.svg';
import textblueIcon from '../../chat-assets/chat-icons/letter-t-icon.svg';
import textwhiteIcon from '../../chat-assets/chat-icons/letter-tcolor-icon.svg';
import userIcon from '../../chat-assets/chat-icons/human-icon.svg';
import folderIcon from '../../chat-assets/chat-icons/folder-icon.svg';
import blueCircleIcon from '../../chat-assets/chat-icons/blue-circle.svg';
import fusciaCircleIcon from '../../chat-assets/chat-icons/fuscia-circle.svg';

import '../../Chat.css';
import Webcam from 'react-webcam';

const Changedatausers = ({
  setImageurl,
  avatarStatus,
  changeTextColor,
  ownerMode,
  setChangedata
}) => {
  const [loading, setLoading] = useState(false);
  const [CameraModal, setCameraModal] = useState(false);
  const webcamref = useRef();

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
        <div className="camera-input" style={{ width: '30vw', right: 0, zIndex: 5 }}>
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
      </div>
      <div className="loading">
        <BarLoader size={1} color={'#7b94a7'} loading={loading} width={'100%'} />
      </div>
    </Fragment>
  );
};

export default Changedatausers;
