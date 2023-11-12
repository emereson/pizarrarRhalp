/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { RouteInterceptor } from 'components/RouteInterceptor';
import { app, crystal } from '../appStyles';
// import { S3Service } from '../services/S3.service';
import { useQuery } from '@apollo/client';
import { GET_GLOBALS } from 'components/UserManagment/graphQL/queries';
import background from '../assets/background/desktop.jpeg';

// const s3Service = new S3Service('public');

const HomeLayout = ({ children, chatVisible = false }) => {
  const [fileUrlState, setFileUrlState] = useState(
    localStorage.getItem('imageUrl') || background
  );
  const [homeFileUrl, setHomeFileUrl] = useState(
    localStorage.getItem('homeImageUrl') || background
  );
  const { data: globalVar } = useQuery(GET_GLOBALS);

  useEffect(() => {
    async function fetchImage() {
      try {
        if (globalVar?.getGlobal) {
          const imageUrl = globalVar.getGlobal.imageUrl;
          const homeImageUrl = globalVar.getGlobal.homeImageUrl;
          localStorage.setItem('imageUrl', imageUrl);
          localStorage.setItem('homeFileUrl', homeImageUrl);
          setFileUrlState(imageUrl);
          setHomeFileUrl(homeImageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchImage();
  }, [globalVar]);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('imageUrl');
    if (storedImageUrl !== fileUrlState) {
      setFileUrlState(storedImageUrl);
    }
  }, [fileUrlState]);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('homeFileUrl');
    if (storedImageUrl !== homeFileUrl) {
      setHomeFileUrl(storedImageUrl);
    }
  }, [homeFileUrl]);

  const StudentProfile = fileUrlState || background;
  const homeProfile = homeFileUrl || background;

  return (
    <>
      <div
        css={app}
        style={{
          backgroundImage: `url(${
            [
              '/',
              '/admin-chat',
              '/booking',
              '/login',
              '/info',
              '/companies',
              '/contact',
              '/share'
            ].includes(window.location.pathname)
              ? homeProfile
              : StudentProfile
          })`
        }}
      >
        <RouteInterceptor />
        <div css={crystal(chatVisible)}>{children}</div>
      </div>
    </>
  );
};

export default HomeLayout;
