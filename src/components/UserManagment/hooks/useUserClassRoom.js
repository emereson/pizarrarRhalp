import React, { useContext, useState, useEffect } from 'react';
import { isUserStudent, isUserTeacher } from '../../../services/cognito.service';
import { gql, useLazyQuery, useSubscription } from '@apollo/client';
import { GET_STUDENT, GET_TEACHER, GET_CLASSROOM } from '../graphQL/queries';
import { ON_UPDATE_STUDENT, ON_UPDATE_TEACHER } from '../graphQL/subscriptions';
import { useUser } from '../UserProvider';
import constants from '../../../enums/constants.enum';
import { ON_UPDATE_CLASSROOM_BY_ID } from '../../Whiteboard/graphQL/subscription';
import { useApolloClient } from '@apollo/client';
import { useUserRole } from '../../../services/cognito.service';
import { USER_ROLES, ICONS_COLORS } from '../../../enums/constants.enum';
import { useLocation } from 'react-router-dom';

export const classRoomContext = React.createContext(null);

const ClassRoomSubscriber = ({ classRoomId }) => {
  useSubscription(ON_UPDATE_CLASSROOM_BY_ID, {
    variables: { id: classRoomId }
  });
  return null;
};

const ClassRoomProvider = ({ children }) => {
  const location = useLocation();
  const client = useApolloClient();
  const [assignedClassRoom, setAssignedClassRoom] = useState({ classRoomId: null });
  const { user } = useUser();
  const userRole = useUserRole();
  const [getStudent, { loading: loadingStudent, data: studentData }] =
    useLazyQuery(GET_STUDENT);
  const [getTeacher, { loading: loadingTeacher, data: teacherData }] =
    useLazyQuery(GET_TEACHER);
  const [getClassRoom, { loading: loadingClassRoom }] = useLazyQuery(GET_CLASSROOM);

  const { data: studentUpdated } = useSubscription(ON_UPDATE_STUDENT, {
    variables: { id: user.attributes.sub }
  });
  const { data: teacherUpdated } = useSubscription(ON_UPDATE_TEACHER, {
    variables: { id: user.attributes.sub }
  });

  // query what classRoom this user is assigned to
  useEffect(() => {
    if (user) {
      queryAssignedClassRoom();
    }
    async function queryAssignedClassRoom() {
      const isStudent = await isUserStudent();
      const isTeacher = await isUserTeacher();
      const variables = {
        variables: {
          id: user?.attributes.sub
        }
      };
      if (isStudent && !loadingStudent) {
        getStudent(variables);
      }
      if (isTeacher && !loadingTeacher) {
        getTeacher(variables);
      }
    }
  }, [user]);

  // query classRoom data
  useEffect(() => {
    if (assignedClassRoom.classRoomId) {
      getClassRoom({
        variables: { id: assignedClassRoom.classRoomId }
      });
    }
  }, [assignedClassRoom]);

  function onClassRoomAssigned(classRoomId) {
    // if the user is in the whiteBoard or the user profile redirect them to the new classRoom
    if (
      location.pathname.includes('whiteBoard') ||
      location.pathname.includes('student-profile')
    ) {
      window.location.href = `/whiteBoard/${classRoomId}`;
    }
    // if the user was kicked out of a classRoom redirect to profile page
    if (classRoomId === constants.CLASSROOM_NOT_ASSIGNED) {
      window.location.href = `/student-profile`;
    } else {
      setAssignedClassRoom({ classRoomId });
    }
  }

  // student was assigned to another classRoom
  useEffect(() => {
    if (studentUpdated) {
      const data = studentUpdated.onStudentUpdated;
      onClassRoomAssigned(data?.classRoomId);
    }
  }, [studentUpdated]);

  // teacher was assigned to another classRoom
  useEffect(() => {
    if (teacherUpdated) {
      const data = teacherUpdated.onTeacherUpdated;
      onClassRoomAssigned(data?.classRoomId);
    }
  }, [teacherUpdated]);

  useEffect(() => {
    let classRoomId = null;
    if (studentData) {
      classRoomId = studentData.getStudent?.classRoom?.id;
    }
    if (teacherData) {
      classRoomId = teacherData.getTeacher?.classRoom?.id;
    }
    if (classRoomId === constants.CLASSROOM_NOT_ASSIGNED) {
      classRoomId = null;
    }
    if (classRoomId) {
      setAssignedClassRoom({ classRoomId });
    }
  }, [studentData, teacherData]);

  function getClassRoomName() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment classRoomName on ClassRoom {
          name
        }
      `
    });
    return result?.name || '';
  }

  function getPage() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment page on ClassRoom {
          page
        }
      `
    });
    return result?.page || 1;
  }

  function isClassRoomDisabled() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment isDiabled on ClassRoom {
          isDisabled
        }
      `
    });
    return result?.isDisabled;
  }

  function getClassRoomBackground() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment backGroundImage on ClassRoom {
          backgroundImageUrl
        }
      `
    });
    return result?.backgroundImageUrl;
  }

  function getIconsColor() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment iconsColor on ClassRoom {
          iconsColor
        }
      `
    });
    return result?.iconsColor || ICONS_COLORS.BLACK;
  }
  function getBlur() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment blur on ClassRoom {
          blur
        }
      `
    });
    return result?.blur || 0;
  }

  function geIsCrystalTheme() {
    const result = client.readFragment({
      id: `ClassRoom:${assignedClassRoom.classRoomId}`,
      fragment: gql`
        fragment iconsColor on ClassRoom {
          isCrystalTheme
        }
      `
    });
    return result?.isCrystalTheme || false;
  }

  function isClassRoomDisabledAndIsStudent() {
    return isClassRoomDisabled() && userRole === USER_ROLES.STUDENTS;
  }

  const data = {
    assignedClassRoom,
    get classRoomName() {
      return getClassRoomName().toUpperCase();
    },
    get page() {
      return getPage();
    },
    get iconsColor() {
      return getIconsColor();
    },
    get blur() {
      return getBlur();
    },
    get isCrystalTheme() {
      return geIsCrystalTheme();
    },
    get backgroundUrl() {
      return getClassRoomBackground();
    },
    get isDisabled() {
      return isClassRoomDisabled();
    },
    get isDisabledAndStudent() {
      return isClassRoomDisabledAndIsStudent();
    },
    get loading() {
      return loadingStudent || loadingTeacher || loadingClassRoom;
    }
  };

  return (
    <>
      {assignedClassRoom.classRoomId && (
        <ClassRoomSubscriber classRoomId={assignedClassRoom.classRoomId} />
      )}
      <classRoomContext.Provider value={data}>{children}</classRoomContext.Provider>
    </>
  );
};

export const useUserClassRoom = () => {
  const context = useContext(classRoomContext);
  if (context === undefined) {
    throw new Error('useUserClassRoom can only be used inside ClassRoomProvider');
  }
  return context;
};

export default ClassRoomProvider;
