import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as BackIcon } from 'assets/icons/back.svg';
import styles from './SlideView.module.scss';
import { useUser } from 'components/UserManagment/UserProvider';
import { ReactComponent as LiveIcon } from 'assets/whiteboard/live-blue.svg';
import { ReactComponent as EditSlideIcon } from 'assets/whiteboard/edit-slide-icon.svg';
import { useUserRole } from 'services/cognito.service';
import { USER_ROLES } from 'enums/constants.enum';
import useCreateStudyProgress from '../hooks/useCreateStudyProgress';
import useGetUserSliders from '../hooks/useGetUserSlides';
import { v4 as uuid } from 'uuid';
import { ReactComponent as AddImage } from 'assets/learningContent/iconsBlue/addImage.svg';
import { ReactComponent as AddSlice } from 'assets/learningContent/iconsBlue/addSlide.svg';
import { ReactComponent as AddText } from 'assets/learningContent/iconsBlue/addText.svg';
import Spinner from 'react-bootstrap/Spinner';
import { ReactComponent as Backwards } from 'assets/learningContent/iconsBlue/backwards.svg';
import { ReactComponent as Trash } from 'assets/learningContent/iconsBlue/trash.svg';
import useSlides from '../hooks/useSlides';
import blankSlide from 'assets/learningContent/blankSlide.png';
import { useEffect } from 'react';
import { ReactComponent as PrevSlideIcon } from 'assets/learningContent/iconsBlue/left arrow-slide.svg';
import { ReactComponent as NextSlideIcon } from 'assets/learningContent/iconsBlue/right arrow-slide.svg';
import {
  findSlide,
  getBase64,
  getFirstSlide,
  getNextSlideFrom,
  getPreviousSlideFrom,
  pageNumber,
  sortSlides
} from '../functions/utils';
import SlideComponent from '../components/SlideComponent/SlideComponent';
import { Link, Slider } from '@material-ui/core';
import { slideDefaultDimentions } from '../constants/constants';
import SlideReadOnly from '../components/SlideReadOnly/SlideReadOnly';
import SlidesListComponent from '../components/SlidesListComponent/SlidesListComponent';
import SwipeableViews from 'react-swipeable-views';
import { ReactComponent as SlideViewButton } from 'assets/learningContent/iconsBlue/viewSlideIcon.svg';
import SelectionComponent from '../components/SelectionComponent/SelectionComponent';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import debounce from 'lodash.debounce';
import RotationSlider from '../components/RotationSlider/RotationSlider';
import { ReactComponent as HomeIcon } from 'assets/whiteboard/black/home-black.svg';

const defaultSlidePattern = {
  texts: [],
  images: [],
  id: uuid(),
  notSaved: true,
  numberToSort: 1,
  minCalification: 0,
  realCalification: 0
};

export default function SlideView() {
  const params = useParams();
  const history = useHistory();
  const userRole = useUserRole();
  const [CollapseTools, setCollapseTools] = useState(false);
  const [CollapseBottomTools, setCollapseBottomTools] = useState(false);
  const { updateLevelProgress } = useCreateStudyProgress();
  const { user } = useUser();
  const { UserData } = useGetUserSliders(user?.username, user.attributes?.name);
  const [NewText, setNewText] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [AddingCalification, setAddingCalification] = useState(false);
  const [EditingText, setEditingText] = useState(false);
  const [swipeableIndex, setswipeableIndex] = useState(0);
  const [RotationSliderVisible, setRotationSliderVisible] = useState(false);
  const {
    LoadingSave: loadingSave,
    createSlide,
    currentLevelSlides,
    deleteAnEntireSlide,
    refetchSlides,
    queryLoading,
    upsertSlides
  } = useSlides(params?.level);
  const [CurrentDisplayedSlide, setCurrentDisplayedSlide] = useState(defaultSlidePattern);
  const [CurrentDraft, setCurrentDraft] = useState(defaultSlidePattern);
  const [SlidesDrafts, setSlidesDrafts] = useState([]);
  const preventLastStateSetting = useRef(false);
  const [Deleting, setDeleting] = useState(false);
  const swipeToSlide = useCallback(() => {
    const slide = currentLevelSlides.filter(s => s.id === params.slideId);
    if (slide.length && slide[0]?.id) setswipeableIndex(slide[0].numberToSort - 1);
  }, [currentLevelSlides, params]);

  useEffect(() => {
    swipeToSlide();
  }, []);

  // saving
  const saveFunction = useCallback(
    forceDrafts => {
      const newSlidesDrafts = sortSlides(forceDrafts ? forceDrafts : SlidesDrafts).filter(
        d => d.id
      );
      upsertSlides(forceDrafts ? forceDrafts : newSlidesDrafts).then(() => {
        refetchSlides();
      });
    },
    [createSlide, CurrentDraft, SlidesDrafts]
  );

  useEffect(() => {
    if (currentLevelSlides.length > 0 && !SlidesDrafts.length) {
      setSlidesDrafts(currentLevelSlides);
    }
    if (currentLevelSlides.length === 0) {
      setCurrentDisplayedSlide(defaultSlidePattern);
      history.push(
        '/learning-content/document/' + params.level + '/' + defaultSlidePattern.id
      );
    }
  }, [CurrentDraft, currentLevelSlides, SlidesDrafts, EditMode]);

  const changeCalification = e => {
    const number = parseInt(e.target.value);
    setCurrentDraft({
      ...CurrentDraft,
      minCalification: number
    });
  };

  const handleEditSlide = useCallback(() => {
    if (params.slideId === CurrentDisplayedSlide?.id) {
      if (!SlidesDrafts.length) setSlidesDrafts([CurrentDisplayedSlide]);
      setCurrentDraft(CurrentDisplayedSlide);
      setEditMode(true);
    } else {
      if (!SlidesDrafts.length) setSlidesDrafts([defaultSlidePattern]);
      setCurrentDraft(defaultSlidePattern);
      setEditMode(true);
    }
  }, [setCurrentDraft, SlidesDrafts, CurrentDisplayedSlide]);

  const changeRealCalification = e => {
    const number = parseInt(e.target.value);
    setCurrentDraft({
      ...CurrentDraft,
      realCalification: number
    });
  };

  const handleClickOnSlide = useCallback(
    (e, insertNewText) => {
      if (EditingText && e.target.id === 'clickeable-dismiss-area') {
        setEditingText(null);
      }
      if (insertNewText) {
        let rect = insertNewText?.parent?.getBoundingClientRect();
        const { x, y } = insertNewText?.position;
        const { x: width, y: height } = insertNewText?.dimentions;
        const newText = {
          id: uuid(),
          text: '',
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          width: Math.abs((width / rect.width) * 100),
          height: Math.abs((height / rect.height) * 100)
        };
        setCurrentDraft({
          ...CurrentDraft,
          texts: [...CurrentDraft.texts, newText]
        });
      }
    },
    [CurrentDraft, NewText, EditingText]
  );

  const handleBack = useCallback(() => {
    history.push('/learning-content/document/no_redirect');
    updateLevelProgress({
      variables: {
        id: UserData.id,
        level: 'null',
        owner: UserData.owner
      }
    });
  }, [UserData]);

  const handleBackHome = () => {
    history.push('/student-profile');
  };

  const openExplorer = () => {
    const element = document.getElementById('imageSelector');
    element.click();
  };

  const openRotationSlider = () => {
    setRotationSliderVisible(!RotationSliderVisible);
  };

  const handleTools = () => {
    if (!CollapseTools) {
      setCollapseTools(!CollapseTools);
      setTimeout(() => {
        setCollapseBottomTools(!CollapseBottomTools);
      }, 500);
    } else {
      setCollapseBottomTools(!CollapseBottomTools);
      setTimeout(() => {
        setCollapseTools(!CollapseTools);
      }, 500);
    }
  };

  const changeDraftText = (e, item, newProps) => {
    let copy = [...CurrentDraft.texts];
    const index = copy.map(object => object.id).indexOf(item.id);
    copy.splice(index, 1, {
      ...item,
      ...newProps,
      text: e?.target?.value || item.text
    });
    setCurrentDraft({
      ...CurrentDraft,
      texts: copy
    });
  };

  const changeDraftImage = (e, item, newProps) => {
    let copy = [...CurrentDraft.images];
    const index = copy.map(object => object.id).indexOf(item.id);
    copy.splice(index, 1, {
      ...item,
      ...newProps,
      imageUrl: e?.target?.value || item.imageUrl
    });
    setCurrentDraft({
      ...CurrentDraft,
      images: copy
    });
  };

  const handleSetAsFixedPosition = useCallback(
    (variant, item, deselect) => {
      let copy = [...(variant === 'text' ? CurrentDraft.texts : CurrentDraft.images)];
      const index = copy.indexOf(item);
      copy.splice(index, 1, {
        ...item,
        fixed: deselect === 'deselect' ? false : true
      });
      if (variant === 'text') {
        setCurrentDraft({
          ...CurrentDraft,
          texts: copy
        });
      }
      if (variant === 'image') {
        setCurrentDraft({
          ...CurrentDraft,
          images: copy
        });
      }
    },
    [CurrentDraft]
  );

  const handleDeleteItem = (variant, item) => {
    setDeleting(true);
    if (variant === 'text') {
      let copy = [...CurrentDraft.texts];
      const index = copy.map(object => object.id).indexOf(item.id);
      copy.splice(index, 1);
      if (EditingText && item?.id === EditingText?.id) setEditingText(null);
      setCurrentDraft({
        ...CurrentDraft,
        texts: copy
      });
    }
    if (variant === 'image') {
      const copy = [...CurrentDraft.images];
      const index = copy.map(object => object.id).indexOf(item.id);
      copy.splice(index, 1);
      setCurrentDraft({
        ...CurrentDraft,
        images: copy
      });
    }
    setTimeout(() => {
      setDeleting(false);
    }, 50);
  };

  const handleEditRotation = useCallback(
    newRotation => {
      const item = { ...EditingText };
      delete item.editorChange;
      delete item.editorState;
      const variant = Boolean(item?.text) && item?.text.length > 0 ? 'text' : 'image';
      let copy = [...(variant === 'text' ? CurrentDraft.texts : CurrentDraft.images)];
      const index = copy.map(object => object.id).indexOf(item.id);
      const stylesObject = {
        ...JSON.parse(item?.styles),
        transform: newRotation
      };
      if (variant === 'text') {
        copy.splice(index, 1, {
          ...item,
          styles: JSON.stringify(stylesObject)
        });
        setCurrentDraft({
          ...CurrentDraft,
          texts: copy
        });
      }
      if (variant === 'image') {
        copy.splice(index, 1, {
          ...item,
          styles: JSON.stringify(stylesObject)
        });
        setCurrentDraft({
          ...CurrentDraft,
          images: copy
        });
      }
    },
    [CurrentDraft, EditingText]
  );

  const handleUploadImage = async e => {
    const image = e.target.files[0];
    getBase64(image)
      .then(imageBase64 => {
        setCurrentDraft({
          ...CurrentDraft,
          images: CurrentDraft.images.concat([
            {
              id: uuid(),
              draftUrl: imageBase64,
              imageUrl: imageBase64,
              realFileAsBlob: image,
              coords: {
                x: 0,
                y: 0
              }
            }
          ])
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const changeSlidePositionFromDrag = useCallback(
    (slide, to) => {
      // local changes
      const { numberToSort: toChange } = slide;

      const sense = toChange < to + 1 ? 1 : 0;

      var division1 = [...SlidesDrafts].slice(0, sense ? to + 1 : to);
      var division2 = [...SlidesDrafts].slice(
        sense ? to + 1 : to,
        [...SlidesDrafts].length
      );

      const validation1 = division1.findIndex(d => d.numberToSort === toChange);
      const validation2 = division2.findIndex(d => d.numberToSort === toChange);

      if (validation1 > -1)
        division1 = division1.filter(d => d.numberToSort !== toChange);
      if (validation2 > -1)
        division2 = division2.filter(d => d.numberToSort !== toChange);

      const concatResult = division1.concat([slide]).concat(division2);

      // format result
      const resultAfterConcat = concatResult.map((slide, index) => {
        return {
          ...slide,
          numberToSort: index + 1
        };
      });

      const slideAfterFormat = resultAfterConcat.filter(d => d.id === slide.id)[0];

      setSlidesDrafts(resultAfterConcat);
      setCurrentDraft(defaultSlidePattern);
      setTimeout(() => {
        setCurrentDraft(slideAfterFormat);
      }, 100);
    },
    [CurrentDraft?.id, SlidesDrafts]
  );

  useEffect(() => {
    if (currentLevelSlides.length > 0) {
      if (params.slideId === 'null' || params.slideId === 'undefined') {
        const first = getFirstSlide(currentLevelSlides);
        history.push('/learning-content/document/' + params.level + '/' + first.id);
        refetchSlides();
      } else {
        const currentSlideToDisplay = findSlide(currentLevelSlides, params.slideId);
        setCurrentDisplayedSlide(currentSlideToDisplay);
      }
    }
  }, [currentLevelSlides, params]);

  useEffect(() => {
    let slide = sortSlides(currentLevelSlides)[swipeableIndex];
    if (slide?.id) {
      history.replace('/learning-content/document/' + params.level + '/' + slide.id);
      refetchSlides();
    }
  }, [swipeableIndex, currentLevelSlides]);

  const handleNewSlideIndex = index => {
    setswipeableIndex(index);
  };

  const handleCreateNewBlankSlide = useCallback(() => {
    // local changes
    if (CurrentDraft) {
      const currentNewSlideId = uuid();
      const currentIndex = SlidesDrafts.findIndex(s => s.id === CurrentDraft?.id);
      const slidesBeforeNew = [...SlidesDrafts].splice(0, currentIndex + 1);
      const slidesAfterNew = [...SlidesDrafts]
        .splice(currentIndex + 1, [...SlidesDrafts].length)
        .map(slide => {
          return {
            ...slide,
            numberToSort: slide.numberToSort + 1
          };
        });
      const newSlide = {
        ...defaultSlidePattern,
        id: currentNewSlideId,
        numberToSort: (CurrentDraft?.numberToSort || 0) + 1
      };

      const concatResult = slidesBeforeNew.concat([newSlide]).concat(slidesAfterNew);

      setSlidesDrafts(concatResult);
      setCurrentDraft(newSlide);
      history.replace('/learning-content/document/' + params.level + '/' + newSlide?.id);
    } else {
      setSlidesDrafts([defaultSlidePattern]);
      setCurrentDraft(defaultSlidePattern);
      history.replace(
        '/learning-content/document/' + params.level + '/' + defaultSlidePattern?.id
      );
    }
  }, [createSlide, SlidesDrafts, history, params.level]);

  const handleClickInASlide = useCallback(
    id => {
      history.replace('/learning-content/document/' + params.level + '/' + id);
      const currentSlideinDraft = SlidesDrafts.filter(d => d.id === id);
      if (currentSlideinDraft.length) {
        setCurrentDraft(defaultSlidePattern);
        preventLastStateSetting.current = true;
        setTimeout(() => {
          setCurrentDraft(currentSlideinDraft[0]);
        }, 100);
      }
    },
    [SlidesDrafts, params, history]
  );

  const handleDeleteSlide = useCallback(() => {
    // local changes
    const prevSlide =
      getPreviousSlideFrom(SlidesDrafts, CurrentDraft?.id) ||
      getNextSlideFrom(SlidesDrafts, CurrentDraft?.id);
    const currentIndex = SlidesDrafts.findIndex(s => s.id === CurrentDraft?.id);

    const slidesBeforeDeleted = [...SlidesDrafts].splice(0, currentIndex);
    const slidesAfterDeleted = [...SlidesDrafts]
      .splice(currentIndex + 1, [...SlidesDrafts].length)
      .map(slide => {
        return {
          ...slide,
          numberToSort: slide.numberToSort - 1
        };
      });

    var concatResult = slidesBeforeDeleted.concat(slidesAfterDeleted);

    const afterSave = () => {
      setSlidesDrafts(
        concatResult.map((slide, index) => {
          return {
            ...slide,
            numberToSort: index + 1
          };
        })
      );
      setCurrentDraft(prevSlide);
      history.replace('/learning-content/document/' + params.level + '/' + prevSlide?.id);
    };

    const ifThereisNone = () => {
      setSlidesDrafts([]);
      setCurrentDraft(null);
      history.replace('/learning-content/document/' + params.level + '/null');
    };

    // DB Changes
    if (!CurrentDraft?.notSaved) {
      deleteAnEntireSlide(CurrentDraft).then(() => {
        if (concatResult.length >= 1) {
          afterSave();
        } else {
          ifThereisNone();
        }
      });
    } else {
      if (concatResult.length >= 1) {
        afterSave();
      } else {
        ifThereisNone();
      }
    }
  }, [CurrentDraft, setSlidesDrafts, SlidesDrafts]);

  const handlingSlidesChanges = useCallback(
    drafts => {
      if (!preventLastStateSetting.current) {
        if (EditMode) {
          if (drafts) {
            const slidesCopy = [...SlidesDrafts];
            const index = slidesCopy.findIndex(d => d?.id === drafts?.id);
            slidesCopy.splice(index, 1, drafts);
            setSlidesDrafts(
              slidesCopy.map((slide, index) => {
                return {
                  ...slide,
                  numberToSort: index + 1
                };
              })
            );
          }
        }
      }
      preventLastStateSetting.current = false;
    },
    [currentLevelSlides, SlidesDrafts, EditMode]
  );

  useEffect(() => {
    handlingSlidesChanges(CurrentDraft);
  }, [CurrentDraft]);

  const handleSlideViewButton = useCallback(() => {
    const slideIndexInCarousel = sortSlides(currentLevelSlides).findIndex(
      d => d.id === params.slideId
    );
    setswipeableIndex(slideIndexInCarousel);
    setTimeout(() => {
      setEditMode(false);
    }, 250);
  }, [params]);

  // texts styling context

  const textTypeFunction = useCallback(
    type => {
      const { editorChange, editorState } = EditingText;
      editorChange(RichUtils.toggleInlineStyle(editorState, type));
    },
    [CurrentDraft, EditingText]
  );

  const colorSelectorFunction = debounce(e => {
    const { styles } = EditingText;
    if (styles) {
      const parsed = JSON.parse(styles);
      const newStyles = {
        ...parsed,
        color: e.target.value
      };
      const newItem = {
        ...EditingText,
        styles: JSON.stringify(newStyles)
      };
      delete newItem.editorChange;
      delete newItem.editorState;
      changeDraftText(null, newItem);
    } else {
      const newStyles = {
        color: e.target.value
      };
      const newItem = {
        ...EditingText,
        styles: JSON.stringify(newStyles)
      };
      delete newItem.editorChange;
      delete newItem.editorState;
      changeDraftText(null, newItem);
    }
  }, 500);

  const incdecFont = useCallback(
    mode => {
      const { styles } = EditingText;
      const parent = document
        .getElementById('real-slide-container-editing')
        .getBoundingClientRect();
      let newItem = {
        ...EditingText
      };
      const formula = measure => (measure / parent.height) * 100;
      const defaultnewfsinpx = mode === 'inc' ? 15 : 13;
      const defaultnewFontSize = {
        number: defaultnewfsinpx,
        scale: formula(defaultnewfsinpx)
      };
      try {
        const parsed = JSON.parse(styles);
        const newFontSize = parsed?.fontSize
          ? {
              number:
                mode === 'inc'
                  ? parsed?.fontSize.number + 1
                  : parsed?.fontSize.number - 1,
              scale:
                mode === 'inc'
                  ? formula(parsed?.fontSize.number + 1)
                  : formula(parsed?.fontSize.number - 1)
            }
          : defaultnewFontSize;
        const newStyles = {
          ...parsed,
          fontSize: newFontSize
        };
        newItem.styles = JSON.stringify(newStyles);
        setEditingText(newItem);
        delete newItem.editorChange;
        delete newItem.editorState;
        changeDraftText(null, newItem);
      } catch (error) {
        const newStyles = {
          fontSize: defaultnewFontSize
        };
        newItem.styles = JSON.stringify(newStyles);
        setEditingText(newItem);
        delete newItem.editorChange;
        delete newItem.editorState;
        changeDraftText(null, newItem);
      }
    },
    [EditingText]
  );

  const iterableStaticTextControlButtons = [
    {
      id: 'bold',
      component: (
        <div
          onClick={() => textTypeFunction('BOLD')}
          className={`
            ${styles.testButton} 
            ${styles.buttons} 
            ${styles.textControls}
          `}
        >
          <p>BOLD</p>
        </div>
      )
    },
    {
      id: 'italic',
      component: (
        <div
          onClick={() => textTypeFunction('ITALIC')}
          className={`
            ${styles.testButton} 
            ${styles.buttons} 
            ${styles.textControls}
          `}
        >
          <p>ITALIC</p>
        </div>
      )
    },
    {
      id: 'colorButton',
      component: (
        <input
          type="color"
          id="colorinput"
          defaultValue={
            EditingText?.styles ? JSON.parse(EditingText?.styles)?.color : '#000000'
          }
          onChange={colorSelectorFunction}
          className={`
            ${styles.testButton} 
            ${styles.buttons} 
            ${styles.textControls}
          `}
        />
      )
    },
    {
      id: 'increaseFont',
      component: (
        <div
          onClick={() => incdecFont('inc')}
          className={`
            ${styles.testButton} 
            ${styles.buttons} 
            ${styles.textControls}
          `}
        >
          <p>
            F{' '}
            {EditingText?.styles && JSON.parse(EditingText?.styles)?.fontSize
              ? JSON.parse(EditingText?.styles)?.fontSize.number
              : '14'}{' '}
            +
          </p>
        </div>
      )
    },
    {
      id: 'decreaseFont',
      component: (
        <div
          onClick={() => incdecFont('dec')}
          className={`
            ${styles.testButton} 
            ${styles.buttons} 
            ${styles.textControls}
          `}
        >
          <p>
            F{' '}
            {EditingText?.styles && JSON.parse(EditingText?.styles)?.fontSize
              ? JSON.parse(EditingText?.styles)?.fontSize.number
              : '14'}{' '}
            -{' '}
          </p>
        </div>
      )
    },
    {
      id: ' x',
      component: (
        <>
          <div
            id="setrotationdegrees"
            onClick={openRotationSlider}
            className={`
                ${styles.testButton} 
                ${styles.buttons} 
                ${styles.textControls}
              `}
          >
            <p>Rt</p>
          </div>
          <RotationSlider
            open={RotationSliderVisible}
            defaultValue={EditingText?.styles}
            updateFunction={handleEditRotation}
            closePopper={() => setRotationSliderVisible(false)}
          />
        </>
      )
    }
  ];

  const iterableSlideStaticControlButtons = [
    {
      id: 'addslide',
      component: (
        <AddSlice onClick={handleCreateNewBlankSlide} className={styles.buttons} />
      )
    },
    {
      id: 'deletebutton',
      component: <Trash onClick={handleDeleteSlide} className={styles.buttons} />
    },
    {
      id: 'addtext',
      component: (
        <AddText onClick={() => setNewText(!NewText)} className={styles.buttons} />
      )
    },
    {
      id: 'addimage',
      component: <AddImage onClick={openExplorer} className={styles.buttons} />
    },
    {
      id: 'viewslide',
      component: (
        <div
          onClick={handleSlideViewButton}
          className={`${styles.testButton} ${styles.buttons}`}
          style={{ borderColor: 'transparent' }}
        >
          <SlideViewButton
            style={{ width: '40px', height: 'auto', transform: 'scale(1.25)' }}
          />
        </div>
      )
    }
  ];

  if (EditMode) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.headerButtonsAndPage}>
            <div className={styles.backIconContainer}>
              <BackIcon
                style={{ color: 'blue' }}
                onClick={() => {
                  setEditMode(false);
                  setCurrentDraft(null);
                }}
                className={styles.backIcon}
              />
            </div>
            <div className={styles.editTools}>
              <div className={styles.paginator}>
                <p>
                  {pageNumber(null, null, false, CurrentDraft?.numberToSort).text ===
                  'PNaN'
                    ? 'P--'
                    : pageNumber(null, null, false, CurrentDraft?.numberToSort).text}
                </p>
              </div>
              <div className={styles.realTools}>
                {EditingText ? (
                  <>
                    {iterableStaticTextControlButtons.map(btn => {
                      return (
                        <React.Fragment key={btn.id}>{btn.component}</React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {iterableSlideStaticControlButtons.map(btn => {
                      return (
                        <React.Fragment key={btn.id}>{btn.component}</React.Fragment>
                      );
                    })}
                    <input
                      type="file"
                      hidden
                      id="imageSelector"
                      onChange={handleUploadImage}
                    />
                    <div className={`${styles.testButton} ${styles.buttons}`}>
                      <p style={{ fontSize: '10px' }}>TEST</p>
                      <input
                        name="examPonderation"
                        placeholder="000"
                        maxLength={3}
                        onChange={changeCalification}
                      />
                    </div>
                    <div
                      onClick={() => setAddingCalification(true)}
                      className={`${styles.testButton} ${styles.buttons}`}
                    >
                      <p
                        className={
                          !AddingCalification
                            ? styles.realCalification__moreSize
                            : styles.realCalification
                        }
                      >
                        ?
                      </p>
                      {AddingCalification && (
                        <input
                          name="examCalificationByProfessor"
                          placeholder="000"
                          maxLength={3}
                          onChange={changeRealCalification}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.name}>
              <p className={styles.texts}>{user?.attributes.name}</p>
              {[USER_ROLES.TEACHERS, USER_ROLES.ADMINS].includes(userRole) && (
                <LiveIcon style={{ color: 'blue' }} className={styles.button} />
              )}
            </div>
          </div>
          <div className={styles.header}></div>
          <div className={`${styles.toolsAndSlides}`}>
            <div
              className={`${styles.slides} ${styles.slides__fullHeight} ${styles.slides__sb}`}
              style={{ paddingLeft: '0' }}
            >
              <div className={styles.slidesListContainer}>
                <SlidesListComponent
                  slides={sortSlides(SlidesDrafts)}
                  handleClickInASlide={handleClickInASlide}
                  blankSlide={blankSlide}
                  isEditingCurrentSlide={CurrentDraft?.id}
                  setListToRender={e => setSlidesDrafts(e)}
                  changeSlidePositionFromDrag={changeSlidePositionFromDrag}
                />
              </div>
              {CurrentDraft && (
                <SlideComponent
                  EditMode={EditMode}
                  CurrentDisplayedSlide={CurrentDisplayedSlide}
                  currentLevelSlides={currentLevelSlides}
                  editSlide={handleEditSlide}
                  changeDraftText={changeDraftText}
                  ComponentZoom={1}
                  EditionProps={{
                    CurrentDraft,
                    handleClickOnSlide,
                    NewText,
                    setNewText,
                    loadingSave,
                    saveFunction,
                    handleDeleteItem,
                    updateElementRotation: handleEditRotation,
                    handleSetAsFixedPosition,
                    changeDraftImage,
                    setEditingText,
                    EditingText,
                    Deleting
                  }}
                />
              )}
              {!CurrentDraft && <SlideComponent skeletonSlide />}
            </div>
            {/* zoom functionality */}
            {/* {CurrentDraft && (
            <div className={styles.zoomer}>
              <p className={styles.label}>Zoom</p>
              <div className={styles.slider}>
                <Slider
                  min={0}
                  max={2}
                  aria-label="Zoom"
                  step={0.01}
                  defaultValue={1}
                  style={{ width: '100%' }}
                  onChange={ZoomChange}
                />
              </div>
              <p className={styles.value}>{(ComponentZoom * 100).toFixed()}%</p>
            </div>
          )} */}
          </div>
        </div>
      </>
    );
  }

  const showPrevButton =
    Boolean(
      sortSlides(currentLevelSlides)[
        pageNumber(null, null, null, CurrentDisplayedSlide?.numberToSort || 0).number - 1
      ]
    ) &&
    pageNumber(null, null, null, CurrentDisplayedSlide?.numberToSort || 0).number - 1;

  const handleChangeSwipeableViews = value => {
    const realIndex = value + 1;
    const slide = currentLevelSlides.filter(s => s.numberToSort === realIndex);
    if (slide.length && slide[0]?.id) {
      history.replace('/learning-content/document/' + params.level + '/' + slide[0].id);
      setCurrentDisplayedSlide(slide[0]);
      setswipeableIndex(value);
      refetchSlides();
    }
  };

  return (
    <div className={styles.container}>
      {queryLoading && (
        <div className={styles.spinnerComp} style={{ width: '100%' }}>
          <Spinner className={styles.spinner} animation="border" />
        </div>
      )}
      <div
        className={[
          styles.headerButtonsAndPage,
          styles.headerButtonsAndPage__noEdit,
          styles.headerButtonsAndPage__readOnly
        ].join(' ')}
      >
        <div className={styles.containerBackIcons}>
          <BackIcon
            style={{ color: 'blue', zIndex: '1000' }}
            onClick={handleBack}
            className={`${styles.backIcon} ${styles.backIcon__readOnly}`}
          />
          <Link to={'/'}>
            <HomeIcon className={styles.homeIcon}
            onClick={handleBackHome}
            />
          </Link>
        </div>

        <p className={styles.texts} style={{ fontSize: '13px' }}>
          {user?.attributes.name}
        </p>
        <LiveIcon
          style={{ color: 'blue' }}
          className={`${styles.backIcon} ${styles.backIcon__readOnly}`}
        />
      </div>
      <div className={styles.toolsAndSlides}>
        <div
          className={`${styles.slides} ${styles.slides__fullHeight} ${styles.slides__readOnly}`}
        >
          <SwipeableViews
            index={swipeableIndex}
            disableLazyLoading
            enableMouseEvents
            slideClassName={styles.swipeableSlideClassName}
            className={styles.swipeableViews}
            onChangeIndex={handleChangeSwipeableViews}
          >
            {currentLevelSlides.length
              ? sortSlides(currentLevelSlides).map((slide, index) => {
                  return (
                    <SlideReadOnly
                      CurrentDisplayedSlide={slide}
                      currentLevelSlides={currentLevelSlides}
                      editSlide={handleEditSlide}
                      slideKey={index}
                      key={slide.id}
                    />
                  );
                })
              : sortSlides([defaultSlidePattern]).map((slide, index) => {
                  return (
                    <SlideReadOnly
                      CurrentDisplayedSlide={slide}
                      currentLevelSlides={currentLevelSlides}
                      editSlide={handleEditSlide}
                      slideKey={index}
                      key={slide.id}
                    />
                  );
                })}
          </SwipeableViews>
        </div>
        {swipeableIndex > 0 && (
          <div
            style={{
              opacity: showPrevButton ? '1' : '0',
              pointerEvents: showPrevButton ? 'all' : 'none'
            }}
            className={styles.prevSlide}
          >
            <PrevSlideIcon
              className={styles.icon}
              onClick={() => handleNewSlideIndex(swipeableIndex - 1)}
            />
          </div>
        )}
        {swipeableIndex !== currentLevelSlides.length - 1 && (
          <div className={styles.nextSlide}>
            <NextSlideIcon
              className={styles.icon}
              onClick={() => handleNewSlideIndex(swipeableIndex + 1)}
            />
          </div>
        )}
        <EditSlideIcon
          onClick={handleTools}
          className={
            CollapseTools ? styles.deployWhiteboard__morePadding : styles.deployWhiteboard
          }
        />
      </div>
    </div>
  );
}
