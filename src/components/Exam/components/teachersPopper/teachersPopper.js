import { useUserClassRoom } from 'components/UserManagment/hooks/useUserClassRoom';
import { useClassRoomsStudents } from 'components/Whiteboard/hooks/useClassroomStudents';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useRef, useState } from 'react';
import '../../../Whiteboard/Gallery/ModalSaveImage/popperstyles.css';
import { useQuery } from '@apollo/client';
import { LIST_TEACHERS } from 'components/AdminDashboard/graphql/queries';
import './teachersPopper.scss';

export default function TeachersPopper({ onTeacherSelected, updateLoading, color }) {
  const { data: teachersData, loading } = useQuery(LIST_TEACHERS);
  const [Teachers, setTeachers] = useState([]);
  const accordion = useRef();

  useEffect(() => {
    updateLoading(true);
  }, []);

  useEffect(() => {
    if (teachersData) {
      setTeachers(teachersData?.listTeachers?.items);
      updateLoading(false);
      accordion.current?.click();
    }
  }, [teachersData]);

  return (
    <div
      className={
        color === 'dark' ? 'popper popper-teachers' : 'popper popper-teachers__light'
      }
    >
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
            <p
              className="popper-item popper-teachers-item"
              onClick={() => onTeacherSelected(null)}
            >
              Save to yourself...
            </p>
            {!loading &&
              Teachers?.length > 0 &&
              Teachers.map(teacher => (
                <p
                  className="popper-item popper-teachers-item"
                  onClick={() => onTeacherSelected(teacher.user)}
                >
                  {teacher?.user.name}
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
