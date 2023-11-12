import React, { useEffect, useState } from 'react';
import SlideComponent from '../SlideComponent/SlideComponent';
import SlideReadOnly from '../SlideReadOnly/SlideReadOnly';
import styles from './ImagesPreviews.module.scss';

function ImagesPreviews({
  slide,
  pageNumber,
  handleClickInASlide,
  isEditingCurrentSlide
}) {
  const element = document.getElementById('real-slide-container-editing');

  return (
    <div className={styles.slideItemContainer}>
      <p className={styles.slideNumber}>{pageNumber}</p>
      <div
        className={[
          styles.slideItem,
          isEditingCurrentSlide ? styles.slideItem__selected : null
        ].join(' ')}
        onClick={() => handleClickInASlide(slide.id)}
      >
        <SlideReadOnly CurrentDisplayedSlide={slide} slideKey={pageNumber} previewMode />
      </div>
    </div>
  );
}

export default React.memo(ImagesPreviews);
