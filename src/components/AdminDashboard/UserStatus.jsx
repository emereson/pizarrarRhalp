import { useState, useEffect } from 'react';
import { USER_STATUS } from '../../enums/constants.enum';

const styles = {
  width: '25px',
  height: '20px'
};

const ImageFlag = ({ src, alt, className, callingOneBlock, first }) => (
  console.log(first),
  (
    <img
      src={
        callingOneBlock !== 'none'
          ? first
            ? '/static/svg/bell icon grey 2.svg'
            : src
          : src
      }
      alt={alt}
      className={className}
      style={styles}
    />
  )
);

const UserAudioVideo = ({
  callingOneBlock,
  callingState,
  userStatus,
  className,
  inActiveTeacherOrStudent,
  inBlockTeacherOrStudent,
  callingBlock,
  uid
}) => {
  const [first, setfirst] = useState(false);

  const dataInittial = () => {
    inActiveTeacherOrStudent(uid, callingOneBlock);
    setfirst(true);
  };

  useEffect(() => {
    if (first) {
      setTimeout(() => setfirst(false), 10000);
    }
  }, [first]);

  switch (callingState) {
    case 'waitingVideo':
      return (
        <div onClick={dataInittial}>
          <ImageFlag
            first={first}
            callingOneBlock={callingOneBlock}
            src={'/static/svg/calling cammera.svg'}
            alt={'calling cammera'}
            className={'flicker'}
            inBlockTeacherOrStudent={inBlockTeacherOrStudent}
            callingBlock={callingBlock}
            uid={uid}
          />
        </div>
      );
    case 'waitingAudio':
      return (
        <div onClick={dataInittial}>
          <ImageFlag
            first={first}
            callingOneBlock={callingOneBlock}
            src={'/static/svg/calling mic.svg'}
            alt={'calling mic'}
            className={'flicker'}
          />
        </div>
      );
    case 'audio':
      return (
        <div onClick={dataInittial}>
          <ImageFlag
            first={first}
            callingOneBlock={callingOneBlock}
            src={'/static/svg/live mic.svg'}
            alt={'live mic'}
            className={'flicker'}
          />
        </div>
      );
    case 'video':
      return (
        <div onClick={dataInittial}>
          <ImageFlag
            first={first}
            callingOneBlock={callingOneBlock}
            src={'/static/svg/live on cammera.svg'}
            alt={'live on cammera'}
            className={'flicker'}
          />
        </div>
      );
    case 'onblackboard':
      return (
        <div onClick={dataInittial}>
          <ImageFlag
            first={first}
            callingOneBlock={callingOneBlock}
            src={'/static/svg/in profile.svg'}
            alt={'in profile'}
          />
        </div>
      );
    default:
      return (
        <svg
          className={className}
          style={styles}
          viewBox="0 0 140 140"
          preserveAspectRatio="xMinYMin meet"
        >
          <circle
            r="45%"
            cx="50%"
            cy="50%"
            stroke={userStatus === USER_STATUS.NOT_ASSIGNED ? 'black' : 'none'}
            strokeWidth="6"
            fill={userStatus}
          />
        </svg>
      );
  }
};

const UserStatus = ({
  callingInit,
  callingOneBlock,
  callingState,
  userStatus,
  className,
  inActiveTeacherOrStudent,
  inBlockTeacherOrStudent,
  callingBlock,
  uid
}) => {
  return (
    <>
      <UserAudioVideo
        callingInit={callingInit}
        callingOneBlock={callingOneBlock}
        callingState={callingState}
        userStatus={userStatus}
        className={className}
        inActiveTeacherOrStudent={inActiveTeacherOrStudent}
        inBlockTeacherOrStudent={inBlockTeacherOrStudent}
        callingBlock={callingBlock}
        uid={uid}
      />
    </>
  );
};

export default UserStatus;
