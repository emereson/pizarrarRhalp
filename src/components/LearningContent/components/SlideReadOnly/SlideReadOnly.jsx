import { slideDefaultDimentions } from 'components/LearningContent/constants/constants';
import { pageNumber } from 'components/LearningContent/functions/utils';
import { USER_ROLES } from 'enums/constants.enum';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserRole } from 'services/cognito.service';
import ResizableImage from '../ResizableImage';
import styles from '../SlideComponent/SlideComponent.module.scss';
import stylesReadOnly from './SlideReadOnly.module.scss';
import TextInput from '../TextInput';

export default function SlideReadOnly({
  CurrentDisplayedSlide,
  scale,
  editSlide,
  slideKey,
  previewMode
}) {
  const userRole = useUserRole();

  if (previewMode) {
    return (
      <>
        <div
          id={'real-slide-container-without-edit' + slideKey}
          className={[stylesReadOnly.slidePreviewMode]}
        >
          {CurrentDisplayedSlide?.images.length > 0 &&
            CurrentDisplayedSlide.images.map(image => (
              <ResizableImage
                object={image}
                imageUrl={image.imageUrl}
                id={image.id}
                styles={stylesReadOnly}
                parentId={'real-slide-container-without-edit' + slideKey}
                returnOnlyImg
              />
            ))}

          {CurrentDisplayedSlide?.texts.length > 0 &&
            CurrentDisplayedSlide.texts.map(text => (
              <TextInput
                text={text}
                changeDraftText={() => {}}
                styles={styles}
                parentId={'real-slide-container-without-edit' + slideKey}
                preventMoving
              />
            ))}
        </div>
        <div className={[stylesReadOnly.lid]}></div>
      </>
    );
  }

  return (
    <div className={styles.slideZoomerContainer}>
      <div
        id={'real-slide-container-read-only' + '-slideKey-' + slideKey}
        className={styles.slideContainer}
      >
        <div className={styles.paginator}>
          <p>
            {pageNumber(null, null, false, CurrentDisplayedSlide?.numberToSort || 0).text}
          </p>
        </div>
        {[USER_ROLES.ADMINS].includes(userRole) && (
          <div className={styles.editSlide} onClick={editSlide}>
            <p>Edit</p>
          </div>
        )}

        {CurrentDisplayedSlide?.images.map(image => (
          <ResizableImage
            object={image}
            imageUrl={image.imageUrl}
            id={image.id}
            styles={styles}
            preventMoving
            parentId={'real-slide-container-read-only' + '-slideKey-' + slideKey}
            key={image.id}
          />
        ))}

        {CurrentDisplayedSlide?.texts.map((text, index) => (
          <TextInput
            text={text}
            key={`text(${index})`}
            changeDraftText={() => {}}
            styles={styles}
            parentId={'real-slide-container-read-only' + '-slideKey-' + slideKey}
            preventMoving
          />
        ))}
      </div>
    </div>
  );
}
