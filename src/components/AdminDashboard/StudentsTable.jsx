import React, { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Sound from 'react-sound';
import DraggableItem from './DraggableItem';
import { USER_ROLES } from '../../enums/constants.enum';
import { LIST_STUDENTS } from './graphql/queries';
import constants from '../../enums/constants.enum';
import { useUserStatus } from './hooks/useUserStatus';
import UserStatus from './UserStatus';
import { useRemoveStudentFromClassRoom } from './hooks/useRemoveStudentFromClassRoom';
import { useInitCallingStudent } from './hooks/useInitCallingStudent';
import onblackboard from 'assets/sounds/video-llamada/onBlackboard.mp3';
import videollamada from 'assets/sounds/video-llamada/llamada video.mp3';
import audiollamada from 'assets/sounds/voice-call/llamada_audio2.mp3';
import { useBlockCallingStudent } from './hooks/useBlockCallingStudent';
import { useOneBlockCallingStudent } from './hooks/useOneBlockCallingStudent';

const StudentItem = ({ student, inActiveStudent, inBlockStudent }) => {
  const { getStudentStatus } = useUserStatus();
  return (
    <DraggableItem payload={student.user} type={USER_ROLES.STUDENTS}>
      <div
        style={{ columnGap: 10 }}
        className={'d-flex align-items-center justify-content-start'}
      >
        <UserStatus
          callingInit={student.callingInit}
          callingOneBlock={student.callingOneBlock}
          callingBlock={student.callingBlock}
          callingState={student.callingState}
          inActiveTeacherOrStudent={inActiveStudent}
          inBlockTeacherOrStudent={inBlockStudent}
          uid={student.id}
          userStatus={getStudentStatus(student.id)}
        ></UserStatus>
        <span>
          <b>{student.user?.name.replace('ClassRoom', '')}</b>
        </span>
      </div>
    </DraggableItem>
  );
};

const StudentsTable = ({ className }) => {
  const { loading, error, data } = useQuery(LIST_STUDENTS, {
    pollInterval: constants.POLL_INTERVAL
  });
  const { updateStudentBlockCalling } = useBlockCallingStudent();
  const { updateStudentInitCalling } = useInitCallingStudent();
  const { updateStudentOneBlockCalling } = useOneBlockCallingStudent();

  const { removeStudentFromClassRoom, removeStudentLoading, removeStudentError } =
    useRemoveStudentFromClassRoom();

  const [showModal, setShowModal] = useState(false);
  const [openedPlaying, setOpenedPlaying] = useState(Sound.status.STOPPED);
  const handleClose = () => setShowModal(false);
  const [studentToRemove, setStudentToRemove] = useState({});

  const handleRemoveStudentFromClassRoom = student => {
    setShowModal(true);
    setStudentToRemove(student);
  };

  const removeStudentSelected = async () => {
    await removeStudentFromClassRoom(
      studentToRemove.id,
      constants.CLASSROOM_NOT_ASSIGNED
    );
    setShowModal(false);
  };

  const inActiveStudent = (uid, callingOneBlock) => {
    updateStudentOneBlockCalling(
      uid,
      callingOneBlock === 'oneblock' ? 'none' : 'oneblock'
    );
    updateStudentInitCalling(uid, 'inActive');
    setOpenedPlaying(Sound.status.STOPPED);
  };

  const inBlockStudent = (uid, callingBlock) => {
    let block = callingBlock === 'block' ? 'toUnlock' : 'block';
    updateStudentInitCalling(uid, 'inActive');
    updateStudentBlockCalling(uid, block);
    setOpenedPlaying(Sound.status.STOPPED);
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error listing students</h1>;
  }

  const ActiveStudent = ({
    callingBlock,
    callingInit,
    callingOneBlock,
    callingState,
    openedPlaying,
    setOpenedPlaying,
    student
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
        <b>{student?.replace('ClassRoom', '')}</b>
      </>
    ) : (
      <b>{student?.replace('ClassRoom', '')}</b>
    );
  };
  return (
    <Fragment>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Remove {studentToRemove.user?.name} from {studentToRemove.classRoom?.name}{' '}
            classroom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mr-4">
            Do you want to remove user {studentToRemove.user?.name} from{' '}
            {studentToRemove.classRoom?.name} classroom?
          </p>
          {removeStudentLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {removeStudentError && (
            <Alert variant="danger">Error removing teacher from classRoom</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removeStudentSelected}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`${className} user-select-none`}>
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th scope="col">Participant</th>
              <th className="text-center" scope="col">
                ClassRoom
              </th>
            </tr>
          </thead>
          <tbody>
            {data.listStudents.items.map((student, index) => (
              <tr
                key={index}
                onContextMenu={e => {
                  e.preventDefault();
                  handleRemoveStudentFromClassRoom(student);
                }}
              >
                <td className="pl-10">
                  <StudentItem
                    student={student}
                    inActiveStudent={inActiveStudent}
                    inBlockStudent={inBlockStudent}
                  ></StudentItem>
                </td>
                <td className="text-center capitalize">
                  <>
                    {student.callingState === 'none' ? (
                      <b>{student.callingState}</b>
                    ) : (
                      <div className={`d-flex justify-content-center`}>
                        <div style={{ width: '30px' }}></div>
                        <div style={{ width: '30px' }}>
                          <ActiveStudent
                            openedPlaying={openedPlaying}
                            setOpenedPlaying={setOpenedPlaying}
                            callingBlock={student.callingBlock}
                            callingInit={student.callingInit}
                            callingState={student.callingState}
                            callingOneBlock={student.callingOneBlock}
                            student={student.classRoom?.name}
                          />
                        </div>
                        <div style={{ width: '30px' }}>
                          <img
                            onClick={() =>
                              inBlockStudent(student.id, student.callingBlock)
                            }
                            src={
                              student.callingBlock !== 'toUnlock'
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

export default StudentsTable;
