// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useUser } from './components/UserManagment/UserProvider';
import { Auth } from 'aws-amplify';

// COMPONENTS
import HomeLayout from 'layouts/home.layout';
import Home from 'components/Home';
import Booking from 'components/Booking';
import Contact from 'components/Contact';
import WhiteBoard from 'components/Whiteboard';
import Info from 'components/Info';
import SignUp from './components/UserManagment/SignUp';
import ConfirmUser from './components/UserManagment/ConfirmUser';
import UpdatePassword from './components/UserManagment/UpdatePassword';
import ForgotPassword from './components/UserManagment/ForgotPassword';
import TeacherDashboard from 'components/TeacherDashboard';
import StudentProfile from './components/UserManagment/StudentProfile';
import AdminDashboard from './components/AdminDashboard';
import WhiteBoardProvider from './components/Whiteboard/WhiteBoardProvider';
import ClassRoomprovider from './components/UserManagment/hooks/useUserClassRoom';
/**documento de estudio para el estudiante**/
import SelectLevel from './components/StudyDocuments';
import StudyDocumentAdmin from './components/StudyDocuments/adminView/studyDocumentAdmin';
import StudyDocument from 'components/StudyDocuments/userView';

import ExamEditor from 'components/Exam/ExamEditor';
import TakeExam from 'components/Exam/TakeExam';
import Results from 'components/Exam/Results';
import NewLandingPage from 'components/NewLandingPage/NewLandingPage';
import LearningContent from 'components/LearningContent/LearningContent';
import SlideView from 'components/LearningContent/SlidesVisualization/SlideView';
import { useUserRole, isUserAdmin } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import { RouteInterceptor } from 'components/RouteInterceptor';

const redirectToLogin = (
  <Route
    render={({ location }) => (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    )}
  />
);

const PrivateRoute = ({ children, isAdmin }) => {
  const { user, setUser } = useUser();
  const [state, setState] = useState({
    error: null,
    userLoaded: false,
    rolLoaded: false,
    isAdminRole: false
  });

  // check if the user is already authenticated if not redirect to login page
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    })
      .then(user => {
        setUser(user);
        isUserAdmin().then(res => {
          setState(state => ({
            ...state,
            userLoaded: true,
            rolLoaded: true,
            isAdminRole: res
          }));
        });
      })
      .catch(err => {
        console.log(err);
        setState(state => ({
          ...state,
          error: err,
          userLoaded: true,
          rolLoaded: true
        }));
      });
  }, [setUser]);

  const isLoading = !state.userLoaded || !state.rolLoaded;

  if (isLoading) return '...loading';

  if (user) {
    if (isAdmin && !state.isAdminRole) {
      return redirectToLogin;
    }
    return (
      <Route
        render={({ location }) =>
          user ? <ClassRoomprovider>{children}</ClassRoomprovider> : redirectToLogin
        }
      />
    );
  }

  return redirectToLogin;
};

const App = () => {
  const [active, setActive] = useState(false);
  const activeColorChat = chat => setActive(chat);
  const position = active ? '70%' : '100%';
  const role = useUserRole();

  // Global Variables
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.classnames = require('classnames');
  }, []);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={['/', '/login']}>
            <HomeLayout chatVisible={active}>
              <Home activeColorChat={activeColorChat} position={position} />
            </HomeLayout>
          </Route>

          <Route path="/landing-page">
            <NewLandingPage isAdmin={role === USER_ROLES.ADMINS} />
          </Route>

          <Route path="/booking">
            <HomeLayout>
              <Booking />
            </HomeLayout>
          </Route>

          <Route path="/contact">
            <HomeLayout>
              <Contact />
            </HomeLayout>
          </Route>

          <Route path="/info">
            <HomeLayout>
              <Info />
            </HomeLayout>
          </Route>

          <Route path="/admin-chat">
            <HomeLayout chatVisible={active}>
              <PrivateRoute isAdmin>
                <TeacherDashboard activeColorChat={activeColorChat} />
              </PrivateRoute>
            </HomeLayout>
          </Route>

          <Route path="/sign-up">
            <HomeLayout>
              <SignUp />
            </HomeLayout>
          </Route>

          <Route path="/confirm-user/:username">
            <HomeLayout>
              <ConfirmUser />
            </HomeLayout>
          </Route>

          <Route path="/update-password">
            <HomeLayout>
              <UpdatePassword />
            </HomeLayout>
          </Route>

          <Route path="/forgot-password">
            <HomeLayout>
              <ForgotPassword />
            </HomeLayout>
          </Route>

          <Route path="/whiteboard/:classRoomId">
            <PrivateRoute>
              <WhiteBoardProvider>
                <WhiteBoard />
              </WhiteBoardProvider>
            </PrivateRoute>
          </Route>

          <Route path="/admin-dashboard">
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          </Route>

          <Route path="/student-profile">
            <PrivateRoute>
              <HomeLayout>
                <StudentProfile />
              </HomeLayout>
            </PrivateRoute>
          </Route>

          <Route path={'/learning-content/document/:level/:slideId'}>
            <PrivateRoute>
              <HomeLayout>
                <SlideView />
              </HomeLayout>
            </PrivateRoute>
          </Route>

          <Route path={'/learning-content'}>
            <PrivateRoute>
              <HomeLayout>
                <LearningContent />
              </HomeLayout>
            </PrivateRoute>
          </Route>

          <Route path="/student-documents-level/:level">
            <PrivateRoute>
              <HomeLayout>
                <StudyDocument />
              </HomeLayout>
            </PrivateRoute>
          </Route>

          <Route path="/student-documents-admin/:level">
            <PrivateRoute>
              <HomeLayout>
                <StudyDocumentAdmin />
              </HomeLayout>
            </PrivateRoute>
          </Route>

          <Route path="/admin/exam-editor/:examId">
            <PrivateRoute>
              <ExamEditor />
            </PrivateRoute>
          </Route>

          <Route path="/take-exam/:examId">
            <TakeExam />
          </Route>

          <Route path="/results/:examId">
            <Results />
          </Route>

          <Route component={() => <div>Not Found ...</div>} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
