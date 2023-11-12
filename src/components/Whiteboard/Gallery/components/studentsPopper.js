import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';
import { useClassRoomsStudents } from 'components/Whiteboard/hooks/useClassroomStudents';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useRef, useState } from 'react';
import '../ModalSaveImage/popperstyles.css';

export default function StudentsPopper({
  callback,
  Spinner,
  model2,
  sendToAll,
  updateLoading
}) {
  const { getStudents, error, queryLoading, data } = useClassRoomsStudents();
  const [Students, setStudents] = useState([]);
  const accordion = useRef();

  useEffect(() => {
    updateLoading(true);
    getStudents();
  }, []);

  useEffect(() => {
    if (data) {
      setStudents(data.getClassRoom.students.items);
      updateLoading(false);
      accordion.current?.click();
    }
  }, [data]);

  if (model2) {
    return (
      <div className="popper" style={{ width: '100%', background: 'transparent' }}>
        {Students.length > 0 && sendToAll && (
          <p
            className="popper-item"
            style={{ width: '100%' }}
            onClick={() => callback(Students, 'sendingToAll')}
          >
            Send to all
          </p>
        )}
        {!queryLoading ? (
          Students.length > 0 &&
          Students.map(student => (
            <p
              className="popper-item"
              style={{ width: '100%' }}
              onClick={() => callback(student.user)}
            >
              {student.user.name.substring(0, 30)}
              {student.user.name.length >= 30 ? '...' : ''}
            </p>
          ))
        ) : (
          <div className="loading-container" style={{ width: '100%' }}>
            <Spinner className="bran-spinner" animation="border" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="popper">
      <Accordion
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Accordion.Collapse
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
          eventKey="0"
        >
          <React.Fragment>
            {!queryLoading &&
              Students.length > 0 &&
              Students.map(student => (
                <p className="popper-item" onClick={() => callback(student.user)}>
                  {student.user.name.substring(0, 30)}
                  {student.user.name.length >= 30 ? '...' : ''}
                </p>
              ))}
          </React.Fragment>
        </Accordion.Collapse>
        <Accordion.Toggle
          ref={accordion}
          variant="link"
          eventKey="0"
          hidden="hidden"
        ></Accordion.Toggle>
      </Accordion>
    </div>
  );
}
