// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { ReactComponent as LeftIcon } from 'assets/studyDocuments/left-icon.svg';
import { ReactComponent as RightIcon } from 'assets/studyDocuments/right-icon.svg';
import FullScreanIcon from 'assets/studyDocuments/full-screan.png';
import editIcon from 'assets/studyDocuments/edit.png';
import { SLIDE_ELEMENT_TYPES } from 'enums/constants.enum';

const studyDocumentSlideContainer = css`
  position: relative;
  top: 12px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 95%;
  height: 95%;
  z-index: 9999;
  padding: 0px;
  background: white;

  img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center center;
  }

  div {
    width: 100%;
    height: 100%;
  }

  p {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: white;
    color: #000;
    font-size: 1.5em;
    line-height: auto;
  }

  @media (max-width: 425px) and (orientation: landscape) {
    top: 12px;
    height: 95%;
    width: 95%;
  }

  @media (max-width: 320px) and (orientation: landscape) {
    top: 12px;
    height: 95%;
    width: 95%;
  }

  @media (max-width: 425px) and (orientation: portrait) {
    top: 27%;
    height: 45%;
  }

  @media (max-width: 320px) and (orientation: portrait) {
    top: 27%;
    height: 45%;
  }
`;

const dirArrow = css`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background-color: transparent;
  transform: translateY(-50%);
  cursor: pointer;
`;

const fullScreanIcon = css`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  background-color: transparent;
  cursor: pointer;
  z-index: 90;
`;

const Page = ({ num }) => {
  return (
    <span
      style={{
        position: 'absolute',
        top: '-3px',
        left: '40px',
        color: '#000',
        fontSize: '20px',
        zIndex: '90',
        margin: '0px',
        fontWeight: 'bold'
      }}
    >
      P{num + 1}
    </span>
  );
};

const StudyDocumentSlide = ({
  data,
  orderSlides,
  isAdmin,
  isEdit,
  selectedIndex,
  setSelectedIndex,
  setIsEdit
}) => {
  const [position, setPosition] = useState(selectedIndex || 1);
  const handle = useFullScreenHandle();

  const itemsOrd = orderSlides.map(id => {
    return data.find(x => x.id === id);
  });

  const prev = () => {
    if (position === 1) {
      setPosition(data.length);
    } else {
      setPosition(position - 1);
    }
  };

  const next = () => {
    if (position === data.length) {
      setPosition(1);
    } else {
      setPosition(position + 1);
    }
  };

  return (
    <div css={studyDocumentSlideContainer}>
      <Link
        to="/learning-content"
        style={{
          position: 'absolute',
          color: '#000',
          fontSize: '18px',
          top: '0',
          left: '5px'
        }}
      >
        [&#8656;]
      </Link>

      {!isAdmin && (
        <button
          type="button"
          style={{
            position: 'absolute',
            top: '5px',
            right: '40px',
            color: '#000',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            zIndex: '90'
          }}
          onClick={() => {
            setIsEdit(!isEdit);
            setSelectedIndex(position - 1);
          }}
        >
          <img src={editIcon} alt="edit" style={{ width: '17px', height: '17px' }} />
        </button>
      )}

      <a onClick={handle.enter} css={fullScreanIcon}>
        <img src={FullScreanIcon} alt="icon-screan" />
      </a>

      <button
        type="button"
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          color: '#000',
          fontSize: '22px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          zIndex: '90'
        }}
        onClick={() => alert('Mostrando herramientas en pizarra!')}
      >
        [+]
      </button>

      <FullScreen handle={handle}>
        {itemsOrd &&
          itemsOrd.map((data, index) => {
            const elements = data !== undefined ? data.studyDocumentElements.items : null;

            if (position == index + 1) {
              if (elements.length > 0) {
                if (elements[0].type === SLIDE_ELEMENT_TYPES.IMAGE) {
                  return (
                    <div key={index}>
                      <Page num={index} />
                      <img src={JSON.parse(elements[0].value).url} alt={''} />
                    </div>
                  );
                }

                if (elements[0].type === SLIDE_ELEMENT_TYPES.TEXT) {
                  let content = JSON.parse(elements[0].value);
                  return (
                    <div key={index}>
                      <Page num={index} />
                      <p>{content.text && content.text}</p>
                    </div>
                  );
                }
              }
            }
          })}

        {data && data.length > 1 && (
          <>
            <LeftIcon css={dirArrow} style={{ left: '5px' }} onClick={() => prev()} />
            <RightIcon css={dirArrow} style={{ right: '5px' }} onClick={() => next()} />
          </>
        )}
      </FullScreen>
    </div>
  );
};

export default StudyDocumentSlide;
