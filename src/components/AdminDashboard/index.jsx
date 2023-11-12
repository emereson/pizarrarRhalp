import { DndProvider } from 'react-dnd';
import { css, Global } from '@emotion/react';
import MultiBackend from 'react-dnd-multi-backend';
import { useQuery } from '@apollo/client';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline
import ClassRoomList from './ClassRoomList';
import SummaryTable from './SummaryTable';
/** @jsxImportSource @emotion/react */
import StudentsTable from './StudentsTable';
import TeachersTable from './TeachersTable';
import { useQueryAllClassRooms } from './hooks/useQueryAllClassRooms';
import { LIST_STUDENTS, LIST_TEACHERS } from './graphql/queries';

const AdminDashboard = () => {
  const { loading, error, data } = useQueryAllClassRooms();
  const { data: teachersData } = useQuery(LIST_TEACHERS);
  const { data: studentsData } = useQuery(LIST_STUDENTS);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error listing classrooms</h1>;
  }

  const globalStyles = css`
    body {
      overflow-x: hidden;
    }
  `;

  const styles = css`
    #admin-dashboard-container section {
      margin-bottom: 6rem;
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.2rem;
    }
    h1,
    h2,
    h3,
    h4 {
      color: #4156fc;
    }
    th {
      color: 4156fc;
      text-transform: uppercase;
    }
    .capitalize {
      text-transform: capitalize;
    }

    .h-md {
      height: 88vh !important;
      overflow-y: auto;
    }

    @media only screen and (max-width: 768px) {
      .h-md {
        height: 40vh !important;
        overflow-y: auto;
      }
      .displayNone {
        display: none;
      }
    }
  `;

  const DetailsSumary = () => {
    return (
      <>
        <div className="ml-4 mt-4">
          <div className={'d-flex'}>
            <h4 className={'mr-5'}>
              Teachers: {teachersData ? teachersData.listTeachers.items.length : ''}
            </h4>
            <h4>
              participants: {studentsData ? studentsData.listStudents.items.length : ''}
            </h4>
          </div>
        </div>
        <section className="row">
          <SummaryTable
            className="mt-2 col-6"
            list={data.listClassRooms.items}
          ></SummaryTable>
        </section>
      </>
    );
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Global styles={globalStyles} />
      <main id="admin-dashboard-container" className="m-4" css={styles}>
        <h1 className="text-center">Ralph Control Panel</h1>
        <section className="row mt-5 justify-content-between">
          <div className="col-12 col-sm-12 col-md-3 h-md">
            <ClassRoomList className="align-self-center"></ClassRoomList>
            <div className="displayNone mb-5">
              <DetailsSumary />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-9 d-md-flex h-md">
            <TeachersTable className="col-12 col-md-6 mb-5"></TeachersTable>
            <StudentsTable className="col-12 col-md-6 mb-5"></StudentsTable>
          </div>
        </section>
        <div className="d-md-none">
          <DetailsSumary />
        </div>
      </main>
    </DndProvider>
  );
};

export default AdminDashboard;
