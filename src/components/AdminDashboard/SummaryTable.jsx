import { useSortClassRooms } from './hooks/useSortClassRooms';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const styles = css`
  .arrow-down {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    margin-left: 5px;
    position: relative;
    bottom: 2px;
  }

  .btn:focus {
    outline: none;
    box-shadow: none;
  }

  table {
    table-layout: fixed;
    width: 300px;
  }
`;

const SummaryTable = ({ className, list }) => {
  const { sortedClassRooms } = useSortClassRooms(list);

  return (
    <div
      css={styles}
      id="classroom-table"
      className={`${className} user-select-none mb-5`}
    >
      <Accordion>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          <h2 className="ml-3">
            Details{' '}
            <span>
              {' '}
              <i className="arrow-down"></i>{' '}
            </span>
          </h2>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div>
            <table
              style={{ maxWidth: 'none' }}
              className="table table-borderless table-hover"
            >
              <thead>
                <tr className="text-center" style={{ color: '#4156fc' }}>
                  <th scope="col">Teacher</th>
                  <th scope="col">ClassRoom</th>
                  <th scope="col">Participants</th>
                </tr>
              </thead>
              <tbody>
                {sortedClassRooms.map((classRoom, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      {classRoom.teachers.items
                        .map(teacher => teacher.user?.name)
                        .join(',')}
                    </td>
                    <td>{classRoom.name.replace('ClassRoom', '')}</td>
                    <td>{classRoom.students.items.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default SummaryTable;
