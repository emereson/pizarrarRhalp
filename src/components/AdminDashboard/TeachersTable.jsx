import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Sound from 'react-sound';
import constants, { USER_ROLES } from '../../enums/constants.enum';
import { useUserStatus } from './hooks/useUserStatus';
import DraggableItem from './DraggableItem';
import UserStatus from './UserStatus';
import { useRemoveTeacherFromClassRoom } from './hooks/useRemoveTeacherFromClassRoom';
import { LIST_TEACHERS } from './graphql/queries';
import onblackboard from 'assets/sounds/video-llamada/onBlackboard.mp3';
import videollamada from 'assets/sounds/video-llamada/llamada video.mp3';
import audiollamada from 'assets/sounds/voice-call/llamada_audio2.mp3';

import { useInitCallingTeacher } from './hooks/useInitCallingTeacher';
import { useBlockCallingTeacher } from './hooks/useBlockCallingTeacher';
import { useOneBlockCallingTeacher } from './hooks/useOneBlockCallingTeacher';

const TeacherItem = ({ teacher, inActiveTeacher, inBlockTeacher }) => {
  const { getTeacherStatus } = useUserStatus();

  return (
    <DraggableItem payload={teacher.user} type={USER_ROLES.TEACHERS}>
      <div
        style={{ columnGap: 10 }}
        className={'d-flex align-items-center justify-content-start'}
      >
        <UserStatus
          callingInit={teacher.callingInit}
          callingOneBlock={teacher.callingOneBlock}
          callingBlock={teacher.callingBlock}
          callingState={teacher.callingState}
          inActiveTeacherOrStudent={inActiveTeacher}
          inBlockTeacherOrStudent={inBlockTeacher}
          uid={teacher.id}
          userStatus={getTeacherStatus(teacher.id)}
        ></UserStatus>
        <span>
          <b>{teacher.user?.name}</b>
        </span>
      </div>
    </DraggableItem>
  );
};

const TeachersTable = ({ className }) => {
  const { updateTeacherBlockCalling } = useBlockCallingTeacher();
  const { updateTeacherInitCalling } = useInitCallingTeacher();
  const { updateTeacherOneBlockCalling } = useOneBlockCallingTeacher();

  const { loading, error, data } = useQuery(LIST_TEACHERS, {
    pollInterval: constants.POLL_INTERVAL
  });

  const { removeTeacherFromClassRoom, removeTeacherLoading, removeTeacherError } =
    useRemoveTeacherFromClassRoom();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [teacherToRemove, setTeacherToRemove] = useState({});

  const [openedPlaying, setOpenedPlaying] = useState(Sound.status.PLAYING);

  const handleRemoveTeacherFromClassRoom = teacher => {
    setShowModal(true);
    setTeacherToRemove(teacher);
  };

  const removeTeacherSelected = async () => {
    await removeTeacherFromClassRoom(
      teacherToRemove.id,
      constants.CLASSROOM_NOT_ASSIGNED
    );
    setShowModal(false);
  };

  const inActiveTeacher = (uid, callingOneBlock) => {
    let block = callingOneBlock === 'oneblock' ? 'none' : 'oneblock';
    if (block) {
      setOpenedPlaying(Sound.status.STOPPED);
      updateTeacherOneBlockCalling(uid, block);
      updateTeacherInitCalling(uid, 'inActive');
    }
  };

  const inBlockTeacher = (uid, callingBlock) => {
    let block = callingBlock === 'block' ? 'toUnlock' : 'block';
    if (block) {
      setOpenedPlaying(Sound.status.STOPPED);
      updateTeacherBlockCalling(uid, block);
      updateTeacherInitCalling(uid, 'inActive');
    }
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error listing teachers</h1>;
  }

  const ActiveTeacher = ({
    callingBlock,
    callingInit,
    callingOneBlock,
    callingState,
    openedPlaying,
    setOpenedPlaying,
    teacher
  }) => {
    const [first, setfirst] = useState(null);
    /* Setting the state of the sound to play or stop. */
    let block = callingBlock !== 'block' ? Sound.status.PLAYING : Sound.status.STOPPED;
    useEffect(() => {
      setOpenedPlaying(block);
    }, [block, callingBlock]);

    useEffect(() => {
      switch (callingState) {
        case 'waitingVideo':
          if (callingOneBlock === 'none') setfirst(videollamada);
          break;
        case 'waitingAudio':
          if (callingOneBlock === 'none') setfirst(audiollamada);
          break;
        case 'onblackboard':
          if (callingOneBlock === 'none') setfirst(onblackboard);
          break;
        default:
          setfirst(null);
          break;
      }
    }, [videollamada, audiollamada, onblackboard]);

    return callingInit === 'active' ? (
      <>
        <Sound url={first} playStatus={openedPlaying} autoLoad />
        <b>{teacher.replace('ClassRoom', '')}</b>
      </>
    ) : (
      <b>{teacher.replace('ClassRoom', '')}</b>
    );
  };

  return (
    <Fragment>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Remove {teacherToRemove.user?.name} from {teacherToRemove.classRoom?.name}{' '}
            classroom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mr-4">
            Do you want to remove user {teacherToRemove.user?.name} from{' '}
            {teacherToRemove.classRoom?.name} classroom?
          </p>
          {removeTeacherLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {removeTeacherError && (
            <Alert variant="danger">Error removing teacher from classRoom</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeTeacherSelected}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`${className} user-select-none`}>
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th scope="col">teacher</th>
              <th className="text-center" scope="col">
                ClassRoom
              </th>
            </tr>
          </thead>
          <tbody>
            {data.listTeachers.items.map((teacher, index) => (
              <tr
                key={index}
                onContextMenu={e => {
                  e.preventDefault();
                  handleRemoveTeacherFromClassRoom(teacher);
                }}
              >
                <td className="pl-10">
                  <TeacherItem
                    teacher={teacher}
                    inActiveTeacher={inActiveTeacher}
                    inBlockTeacher={inBlockTeacher}
                  ></TeacherItem>
                </td>
                <td className="text-center capitalize">
                  <>
                    {teacher.callingState === 'none' ? (
                      <b>{teacher.callingState}</b>
                    ) : (
                      <div className={`d-flex justify-content-center`}>
                        <div style={{ width: '30px' }}></div>
                        <div style={{ width: '30px' }}>
                          <ActiveTeacher
                            openedPlaying={openedPlaying}
                            setOpenedPlaying={setOpenedPlaying}
                            callingBlock={teacher.callingBlock}
                            callingInit={teacher.callingInit}
                            callingState={teacher.callingState}
                            callingOneBlock={teacher.callingOneBlock}
                            teacher={teacher.classRoom?.name}
                          />
                        </div>
                        <div style={{ width: '30px' }}>
                          <img
                            onClick={() =>
                              inBlockTeacher(teacher.id, teacher.callingBlock)
                            }
                            src={
                              teacher.callingBlock !== 'toUnlock'
                                ? '/static/svg/bell icon grey 2.svg'
                                : '/static/svg/bell icon grey.svg'
                            }
                            alt={'img'}
                            style={{
                              width: '25px',
                              height: '20px',
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default TeachersTable;
