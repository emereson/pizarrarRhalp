// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import { SLIDES_LIST_BY_LEVELS } from '../graphQl/queries';
import StudyDocumentSlider from '../studyDocumentSlide';
import StudyDocumentAdmin from '../adminView/studyDocumentAdmin';

const StudyDocument = () => {
  const { level } = useParams();

  const [listsDocumentSlides, setDocumentSlides] = useState([]);
  const [orderSlides, setOderSlides] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: sliderData } = useQuery(SLIDES_LIST_BY_LEVELS, {
    variables: { id: level },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (useUserRole === USER_ROLES.ADMINS) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (sliderData) {
      if (sliderData.getLevel.orderArray !== null) {
        const orderSlides = JSON.parse(sliderData.getLevel.orderArray);
        setDocumentSlides(sliderData.getLevel.studyDocumentSlides.items);
        setOderSlides(orderSlides);
      } else {
        setDocumentSlides([]);
        setOderSlides([]);
      }
    }
  }, [sliderData]);

  return (
    <>
      {isEdit ? (
        <StudyDocumentAdmin
          data={listsDocumentSlides}
          orderSlides={orderSlides}
          level={level}
          selectedIndex={selectedIndex}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setSelectedIndex={setSelectedIndex}
        />
      ) : (
        <StudyDocumentSlider
          data={listsDocumentSlides}
          orderSlides={orderSlides}
          isAdmin={isAdmin}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </>
  );
};

export default StudyDocument;
