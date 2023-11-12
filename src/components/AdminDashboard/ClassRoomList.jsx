import React, { Fragment } from 'react';
import DropTarget from './DropTarget';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import { useAssignTeacherToClassRoom } from './hooks/useAssignTeacherToClassRoom';
import { useAssignStudentToClassRoom } from './hooks/useAssignStudentToClassRoom';
import { useToggleClassRoomState } from '../Whiteboard/hooks/useToggleClassRoom';
import { useSortClassRooms } from './hooks/useSortClassRooms';
import DeleteUser from './DeleteUser';
import AccordionItem from './AccordionItem';
import { USER_ROLES } from '../../enums/constants.enum';
import { CLASS_COLORS } from '../../enums/constants.enum';
import { useQueryAllClassRooms } from './hooks/useQueryAllClassRooms';

const hasTeacher = classRoom => classRoom.teachers.items.length;
const hasStudents = classRoom => classRoom.students.items.length;

const getHeaderBg = classRoom => {
  let backGroundColor = CLASS_COLORS.EMPTY;
  if (classRoom.isDisabled) {
    backGroundColor = CLASS_COLORS.DISABLED;
  } else {
    if (hasTeacher(classRoom)) {
      backGroundColor = CLASS_COLORS.WITH_ONLY_TEACHER_HEADER;
    } else if (hasStudents(classRoom)) {
      backGroundColor = CLASS_COLORS.WITH_ONLY_STUDENTS_HEADER;
    }
  }
  return backGroundColor;
};

const getHeaderColor = classRoom => {
  return classRoom.isDisabled ? 'white' : 'black';
};

const getBodyBg = classRoom => {
  if (hasStudents(classRoom)) {
    return hasTeacher(classRoom)
      ? CLASS_COLORS.WITH_STUDENTS_AND_TEACHER_BODY
      : CLASS_COLORS.WITH_ONLY_STUDENTS_BODY;
  } else {
    return CLASS_COLORS.EMPTY;
  }
};

const ClassRoomItem = ({ classRoom, handleDrop }) => {
  const { isTeacherAssignedToClassRoom } = useAssignTeacherToClassRoom();
  const { toggleClassRoom } = useToggleClassRoomState();
  const teacher = isTeacherAssignedToClassRoom(classRoom.id);

  return (
    <DropTarget
      className="drop-container"
      handleDrop={(item, monitor) => {
        handleDrop(item, monitor, classRoom);
      }}
      types={[USER_ROLES.TEACHERS, USER_ROLES.STUDENTS]}
    >
      <Accordion>
        <AccordionItem
          onDoubleClick={() => toggleClassRoom(classRoom.id)}
          eventKey={classRoom.id}
          upperTitle={teacher ? classRoom.name.replace('ClassRoom', '') : ''}
          title={teacher ? teacher.user?.name : classRoom.name}
          iconTeacherStudent={teacher ? 'TEACHER' : 'STUDENT'}
          headerBg={getHeaderBg(classRoom)}
          headerColor={getHeaderColor(classRoom)}
          bodyBg={getBodyBg(classRoom)}
          accordionBody={
            classRoom.students.items.length
              ? classRoom.students.items.map(student => (
                  <AccordionItem
                    key={student.user?.id}
                    upperTitle={classRoom.name.replace('ClassRoom', '')}
                    title={student.user?.name.replace('ClassRoom', '')}
                  ></AccordionItem>
                ))
              : null
          }
        ></AccordionItem>
      </Accordion>
    </DropTarget>
  );
};

const ClassRoomList = ({ className }) => {
  const { data } = useQueryAllClassRooms();
  const { sortedClassRooms } = useSortClassRooms(data.listClassRooms.items);
  const { assignTeacherToClassRoom, teacherAssignedError, setTeacherAssignedError } =
    useAssignTeacherToClassRoom();
  const { assignStudentToClassRoom } = useAssignStudentToClassRoom();

  const handleDrop = (item, monitor, classRoom) => {
    // ! do not remove monitor
    switch (item.type) {
      case USER_ROLES.TEACHERS: {
        return assignTeacherToClassRoom({
          variables: { teacherId: item.payload.id, classRoomId: classRoom.id }
        });
      }
      case USER_ROLES.STUDENTS: {
        return assignStudentToClassRoom({
          variables: { studentId: item.payload.id, classRoomId: classRoom.id }
        });
      }
      default:
        return;
    }
  };

  return (
    <Fragment>
      <Modal
        show={!!teacherAssignedError}
        onHide={() => {
          setTeacherAssignedError(false);
        }}
      >
        <Modal.Header className={'d-flex justify-content-center'} closeButton>
          <Modal.Title>
            {teacherAssignedError && teacherAssignedError.message}
          </Modal.Title>
        </Modal.Header>
      </Modal>
      <div
        className={`${className} user-select-none`}
        css={css`
          .card {
            border-bottom: none !important;
          }
        `}
      >
        {sortedClassRooms.map(classRoom => (
          <ClassRoomItem
            key={classRoom.id}
            handleDrop={handleDrop}
            classRoom={classRoom}
          ></ClassRoomItem>
        ))}
      </div>
      <DeleteUser></DeleteUser>
    </Fragment>
  );
};

export default ClassRoomList;
