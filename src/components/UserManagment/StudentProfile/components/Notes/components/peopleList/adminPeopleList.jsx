import styles from './admin.module.scss';
import { useState } from 'react';

export const PeopleList = ({ classRoomsList, mySelf, setSelectedValue }) => {
  const [principalList, setPrincipalList] = useState(false);
  const [RoomList, setRoomList] = useState(false);
  const [studentslList, setStudentslList] = useState(false);
  const [forValue, setForValue] = useState('For');
  const [roomName, setRoomName] = useState('Room N°');
  const [selectedRoom, setSecletedRoom] = useState('');

  const newClassRoomsList = [...classRoomsList];

  const displayMainList = () => {
    setPrincipalList(!principalList);
    setStudentslList(false);
  };

  const displayClassRoomList = () => {
    setRoomList(!RoomList);
    setStudentslList(false);
  };

  const displayStudentsList = () => {
    setStudentslList(!studentslList);
  };

  const list = e => {
    const value = e.target.getAttribute('data-value');
    setSelectedValue(value);

    const values = value.split('|');
    setForValue(values[1]);

    setPrincipalList(false);
    setRoomList(false);
    setStudentslList(false);
  };

  const classRoomName = e => {
    const name = e.target.getAttribute('room-name');
    setRoomName(name);

    setRoomList(false);

    classRoomvalue(e);
  };

  const classRoomvalue = e => {
    const value = e.target.getAttribute('room-value');
    setSecletedRoom(value);
  };

  return (
    <div className={styles.container}>
      <span onClick={displayMainList} className={styles.forSpan}>
        {forValue} ▼
      </span>
      <ul
        className={styles.principalList}
        style={{ display: principalList ? 'block' : 'none' }}
      >
        <li data-value={`${mySelf}|Myself`} onClick={list}>
          Myself
        </li>
        <li data-value="ALL|All" onClick={list}>
          All
        </li>
        <li data-value="STUDENT|Students" onClick={list}>
          Students
        </li>
        <li data-value="TEACHER|Teachers" onClick={list}>
          Teachers
        </li>
        <li className={styles.listContainer}>
          <span onClick={displayClassRoomList}>{roomName} ▼</span>
          <ul
            className={styles.secondaryLists}
            style={{ display: RoomList ? 'block' : 'none' }}
          >
            {newClassRoomsList
              ?.sort((a, b) => a.id - b.id)
              .map((classRoom, i) => {
                return (
                  <li
                    room-name={classRoom.name}
                    room-value={classRoom.id}
                    onClick={classRoomName}
                    key={i}
                  >
                    {classRoom.name}
                  </li>
                );
              })}
          </ul>
          <ul
            style={{
              display: !RoomList === true && roomName !== 'Room N°' ? 'block' : 'none'
            }}
            className={styles.listRoom}
          >
            {classRoomsList?.map(classRoom => {
              if (selectedRoom == classRoom.id) {
                const truncatedName =
                  classRoom?.teachers?.items[0]?.user?.name.length > 13
                    ? classRoom?.teachers?.items[0]?.user?.name.substring(0, 10) + '...'
                    : classRoom?.teachers?.items[0]?.user?.name;
                return (
                  <div>
                    <li
                      onClick={list}
                      data-value={`${classRoom?.teachers?.items[0]?.user?.id}|${classRoom?.teachers?.items[0]?.user?.name}`}
                    >
                      {truncatedName ?? 'sin profesor'}
                    </li>
                    <li>
                      <span onClick={displayStudentsList}>Students ▼</span>
                      <ul
                        style={{ display: studentslList ? 'block' : 'none' }}
                        className={styles.ThirdLists}
                      >
                        {classRoom?.students?.items?.map(student => {
                          const truncatedName =
                            student.user.name.length > 13
                              ? student.user.name.substring(0, 10) + '...'
                              : student.user.name;

                          return (
                            <li
                              data-value={`${student.user.id}|${student.user.name}`}
                              onClick={list}
                              title={student.user.name}
                            >
                              {truncatedName}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </div>
                );
              }
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};
