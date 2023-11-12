import { Popper, Slider } from '@material-ui/core';
import { slideDefaultDimentions } from 'components/LearningContent/constants/constants';
import {
  exportingComponentToImage,
  getImageBase64FromUrl,
  pageNumber
} from 'components/LearningContent/functions/utils';
import useSlides from 'components/LearningContent/hooks/useSlides';
import { USER_ROLES } from 'enums/constants.enum';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserRole } from 'services/cognito.service';
import ResizableImage from '../ResizableImage';
import TextInput from '../TextInput';
import styles from './SlideComponent.module.scss';
import './popperStyles.css';
import { S3Service } from 'services/S3.service';
import { SelectableGroup } from 'react-selectable';
import RotationSlider from '../RotationSlider/RotationSlider';

const s3Service = new S3Service('public', 'image/png');

export default function SlideComponent({
  EditMode,
  EditionProps,
  CurrentDisplayedSlide,
  currentLevelSlides,
  editSlide,
  changeDraftText,
  ComponentZoom,
  skeletonSlide
}) {
  const params = useParams();
  const userRole = useUserRole();
  const [AnchorPoint, setAnchorPoint] = useState({ anchor: null });
  const [anchorEl, setanchorEl] = useState(null);
  const { slideId } = useParams();
  const { deleteSlideText, deleteSlideImage } = useSlides(slideId);
  const [Rotation, setRotation] = useState(false);
  const [RotationDegrees, setRotationDegrees] = useState(0);
  const [DisplayPreview, setDisplayPreview] = useState(null);
  const [dataToDisplay, setdataToDisplay] = useState(null);
  const [SelectedAreaDimentions, setSelectedAreaDimentions] = useState({
    firstPosition: null,
    lastPosition: null,
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (CurrentDisplayedSlide) setdataToDisplay(CurrentDisplayedSlide);
  }, [CurrentDisplayedSlide]);

  useEffect(() => {
    if (AnchorPoint.anchor) setanchorEl(AnchorPoint.anchor);
  }, [AnchorPoint]);

  const deselectFixedObject = useCallback(() => {
    EditionProps.handleSetAsFixedPosition(
      AnchorPoint?.type,
      AnchorPoint?.item,
      'deselect'
    );
    setAnchorPoint({ anchor: null });
    setanchorEl(null);
  }, []);

  const setFixedObject = useCallback(() => {
    EditionProps.handleSetAsFixedPosition(AnchorPoint?.type, AnchorPoint?.item);
    setAnchorPoint({ anchor: null });
    setanchorEl(null);
  }, [AnchorPoint]);

  const afterSelection = useCallback(
    (target, lastPosition) => {
      const parent = document.getElementById('real-slide-container-editing');
      if (target === 'text') {
        const { firstPosition } = SelectedAreaDimentions;
        const { x: x1, y: y1 } = firstPosition;
        const { x: x2, y: y2 } = lastPosition;
        const newTextDimentions = {
          position: firstPosition,
          dimentions: {
            x: x2 - x1,
            y: y2 - y1
          },
          parent
        };
        EditionProps.handleClickOnSlide(null, newTextDimentions);
      }
    },
    [EditionProps, SelectedAreaDimentions]
  );

  const beginAndFinishSelection = useCallback(
    (e, type, target) => {
      if (type === 'begin') {
        setSelectedAreaDimentions({
          ...SelectedAreaDimentions,
          firstPosition: {
            x: e.offsetX,
            y: e.offsetY
          }
        });
      }
      if (type === 'finish') {
        const lastPosition = {
          x: e.offsetX,
          y: e.offsetY
        };
        setSelectedAreaDimentions({
          ...SelectedAreaDimentions,
          lastPosition
        });
        afterSelection(target, lastPosition);
      }
    },
    [SelectedAreaDimentions, afterSelection]
  );

  const deleteItem = useCallback(() => {
    setAnchorPoint({ anchor: null });
    setanchorEl(null);
    if (AnchorPoint?.type === 'text') {
      if (AnchorPoint?.item?.learningContentSlideTextsId) {
        deleteSlideText({ variables: { id: AnchorPoint?.item.id } }).then(d => {
          EditionProps.handleDeleteItem('text', AnchorPoint?.item);
        });
      } else EditionProps.handleDeleteItem('text', AnchorPoint?.item);
    }
    if (AnchorPoint?.type === 'image') {
      // if (AnchorPoint?.item?.learningContentSlideImagesId) {
      //   deleteSlideImage({ variables: { id: AnchorPoint?.item?.id } }).then(d => {
      //     EditionProps.handleDeleteItem('image', AnchorPoint?.item);
      //   });
      // } else EditionProps.handleDeleteItem('image', AnchorPoint?.item);
      console.log('objeto a eliminar', AnchorPoint?.item);
      EditionProps.handleDeleteItem('image', AnchorPoint?.item);
    }
  }, [AnchorPoint, EditionProps, deleteSlideImage, deleteSlideText]);

  const editItemRotation = useCallback(
    newValue => {
      if (AnchorPoint?.item) {
        EditionProps.handleEditRotation(AnchorPoint?.type, AnchorPoint?.item, newValue);
        setRotationDegrees(newValue);
      }
    },
    [AnchorPoint]
  );

  const handlingExportSlide = async () => {
    const element = document.getElementById('real-slide-container-editing');
    const capture = await exportingComponentToImage(element);

    return capture;
  };

  const getSelectionContext = useCallback(() => {
    if (EditionProps.NewText) {
      return 'text';
    }
    return null;
  }, [EditionProps]);

  if (skeletonSlide) {
    return (
      <div className={styles.slideZoomerContainer} style={{ height: '100%' }}>
        <div className={styles.slideSkeleton}>
          <p>Add a slide to start</p>
        </div>
      </div>
    );
  }

  if (EditMode) {
    const {
      CurrentDraft,
      handleClickOnSlide,
      NewText,
      setNewText,
      loadingSave,
      saveFunction,
      handleDeleteItem,
      changeDraftImage,
      setEditingText,
      updateElementRotation,
      EditingText,
      Deleting
    } = EditionProps;

    const handleSaveSlide = async () => {
      setDisplayPreview(true);
      setTimeout(() => {
        saveFunction();
        setDisplayPreview(false);
      }, 1000);
    };

    const contextMenuButtons = [
      {
        id: 'close',
        func: () => {
          setAnchorPoint({ anchor: null });
          setanchorEl(null);
          setRotation(false);
          setRotationDegrees(0);
        },
        name: 'Close'
      },
      {
        id: 'delete-object',
        func: deleteItem,
        name: 'Delete object'
      }
    ];

    const seteditingtextfunc = element => {
      setEditingText(element);
    };

    return (
      <div className={styles.slideZoomerContainer} style={{ height: '100%' }}>
        {(loadingSave || DisplayPreview) && (
          <div className={styles.photoContainer}>
            <div className={styles.hideElement}></div>
          </div>
        )}
        <div
          id="real-slide-container-editing"
          className={styles.slideContainer__editContainer}
          style={{
            cursor: NewText ? 'crosshair' : 'default',
            transform: `scale(${ComponentZoom})`,
            userSelect: 'none'
          }}
        >
          <SelectableGroup
            enabled={Boolean(getSelectionContext())}
            className={styles.selectionContainer}
            onBeginSelection={e =>
              beginAndFinishSelection(e, 'begin', getSelectionContext())
            }
            onEndSelection={(_, e2) =>
              beginAndFinishSelection(e2, 'finish', getSelectionContext())
            }
          >
            {EditingText && (
              <div
                id="clickeable-dismiss-area"
                className={styles.clickeableDismissArea}
                onClick={handleClickOnSlide}
              />
            )}
            <div className={styles.editSlide} onClick={() => handleSaveSlide()}>
              <p>Save</p>
            </div>

            {CurrentDraft.images.length > 0 &&
              !Deleting &&
              CurrentDraft.images.map((image, index) => (
                <ResizableImage
                  object={image}
                  key={`image(${index})`}
                  imageUrl={image.imageUrl}
                  id={image.id}
                  styles={styles}
                  deleteImage={handleDeleteItem}
                  changeDraftImage={changeDraftImage}
                  parentId={'real-slide-container-editing'}
                  coords={image.coords}
                  AnchorPoint={AnchorPoint}
                  setAnchorPoint={setAnchorPoint}
                />
              ))}

            {CurrentDraft.texts.length > 0 &&
              !Deleting &&
              CurrentDraft.texts.map((text, index) => (
                <TextInput
                  text={text}
                  key={`text(${index})`}
                  changeDraftText={changeDraftText}
                  styles={styles}
                  NewText={NewText}
                  setNewText={setNewText}
                  isEditingfunct={seteditingtextfunc}
                  isEditing={EditingText?.id === text.id}
                  deleteFunction={handleDeleteItem}
                  parentId={'real-slide-container-editing'}
                  AnchorPoint={AnchorPoint}
                  setAnchorPoint={setAnchorPoint}
                />
              ))}
          </SelectableGroup>
        </div>

        {AnchorPoint && (
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-end"
            style={{
              zIndex: 1060,
              width: '300px'
            }}
            className="popper"
          >
            <div
              className="contextMenu"
              style={{ left: AnchorPoint.x || 0, top: AnchorPoint.y || 0, zIndex: 10000 }}
            >
              {contextMenuButtons.map(btn => {
                if (btn.component) {
                  return (
                    <div onClick={btn.func} key={btn.id} className="menuOptions">
                      {btn?.component}
                    </div>
                  );
                }
                return (
                  <div onClick={btn.func} key={btn.id} className="menuOptions">
                    <p>{btn.name}</p>
                  </div>
                );
              })}
              {/* this will be for set fixed objects */}
              {/* <div onClick={!AnchorPoint?.item?.fixed ? setFixedObject : deselectFixedObject} className="menuOptions">
                <p>{!AnchorPoint?.item?.fixed ? 'Set as fixed object' : 'Unmark as fixed object'}</p>
              </div> */}
              {/* <div onClick={() => setRotation(true)} className="menuOptions">
                <p onClick={Rotation ? () => setRotation(false) : null}>
                  {!Rotation ? 'Edit rotation' : 'Cancel edit rotation'}
                </p>
                {Rotation && (
                  <div className="rotationSlider">
                    <div className="slider">
                      <Slider
                        min={0}
                        max={360}
                        step={10}
                        aria-label="rotation"
                        style={{ width: '100%' }}
                        color="primary"
                        onChange={(e, newValue) => editItemRotation(newValue)}
                      />
                    </div>
                    <p className="text">{RotationDegrees}Deg</p>
                  </div>
                )}
              </div> */}
            </div>
          </Popper>
        )}
      </div>
    );
  }

  return (
    <div
      className={styles.slideZoomerContainer}
      id="slide-zoomer-container"
      style={{ height: '100%' }}
    >
      <div id="real-slide-container-without-edit" className={styles.slideContainer}>
        <div className={styles.paginator}>
          <p>{pageNumber(currentLevelSlides, params?.slideId).text}</p>
        </div>
        {[USER_ROLES.ADMINS].includes(userRole) && (
          <div className={styles.editSlide} onClick={editSlide}>
            <p>Edit</p>
          </div>
        )}

        {dataToDisplay?.images.length > 0 &&
          dataToDisplay.images.map(image => (
            <ResizableImage
              object={image}
              imageUrl={image.imageUrl}
              id={image.id}
              styles={styles}
              preventMoving
            />
          ))}

        {dataToDisplay?.texts.length > 0 &&
          dataToDisplay.texts.map(text => (
            <TextInput
              text={text}
              changeDraftText={changeDraftText}
              styles={styles}
              preventMoving
            />
          ))}
      </div>
    </div>
  );
}
