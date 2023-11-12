import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';
import CrystalButton from '../../common/CrystalButton';
import { useLoadExam } from '../hooks/useLoadExam';
import { ErrorBoundary } from 'react-error-boundary';
import Question from '../Question/Question';
import { selectedAnswersVar, examSectionNumberVar } from '../typePolicies';
import { useReactiveVar } from '@apollo/client';
import Tachometer from '../../common/Tachometer';
import { Link, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import './styles.scss';
import '../Question/animations.css';

import { KeyboardArrowDown } from '@material-ui/icons';
import { Hidden } from '@material-ui/core';

function TakeExam() {
  const { examId } = useParams();
  const {
    examData: {
      currentExamSection,
      totalSections,
      totalQuestionsInCurrentSection,
      totalQuestions,
      currentExamQuestionRelativeNumber,
      examColorScheme,
      results
    },
    loadingExam
  } = useLoadExam(examId);
  const examSectionNumber = useReactiveVar(examSectionNumberVar);
  const [CurrentView, setCurrentView] = useState(0);
  const currentViewRef = useRef(0);
  const currentSectionScrollLimit = useRef(0);
  const selectedAnswers = useReactiveVar(selectedAnswersVar);
  const [isHide, setisHide] = useState('__');
  const [ExamAnimationX, setExamAnimationX] = useState('exam-form');
  const isLoading = loadingExam;
  const [Above750, setAbove750] = useState(window.innerWidth > 750);
  const [Viewport, setViewport] = useState(window.innerWidth);
  const [QuestionIndex, setQuestionIndex] = useState({
    sections: [],
    indexes: []
  });

  const numQuestionsCorrect = Object.values(results).filter(
    question => question.isCorrect
  );

  useEffect(() => {
    const handleViewport = () => {
      setViewport(window.innerWidth);
    };

    window.addEventListener('resize', handleViewport);

    return () => {
      window.removeEventListener('resize', handleViewport);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examSectionNumber]);

  useEffect(() => {
    if (
      QuestionIndex.sections.filter(section => section === currentExamSection?.id)
        .length == 0
    ) {
      if (currentExamSection?.questions?.length > 0) {
        setQuestionIndex({
          indexes: QuestionIndex.indexes.concat(currentExamSection?.questions),
          sections: QuestionIndex.sections.concat(currentExamSection?.id)
        });
      }
    }
  }, [currentExamSection]);

  const getPreviousExamSection = () => {
    setExamAnimationX('exam-form__animate-X');
    setTimeout(() => {
      setisHide('__opacity-0');
      document.getElementById('take-exam-container')?.scrollTo({ top: 0 });
      setExamAnimationX('exam-form__animate-X-jump');
      setCurrentView(0);
      currentViewRef.current = 0;
    }, 100);
    setTimeout(() => {
      examSectionNumberVar(Math.max(examSectionNumber - 1, 0));
      setExamAnimationX('exam-form');
    }, 350);
    setTimeout(() => {
      setisHide('_');
    }, 500);
  };

  const getNextExamSection = () => {
    setExamAnimationX('exam-form__animateX');
    setTimeout(() => {
      setisHide('__opacity-0');
      document.getElementById('take-exam-container')?.scrollTo({ top: 0 });
      setExamAnimationX('exam-form__animateX-jump');
      setCurrentView(0);
      currentViewRef.current = 0;
    }, 150);
    setTimeout(() => {
      examSectionNumberVar(Math.min(examSectionNumber + 1, totalSections - 1));
      setExamAnimationX('exam-form');
    }, 350);
    setTimeout(() => {
      setisHide('_');
    }, 500);
  };

  const handleCheckBoxChange = (event, question, selectType) => {
    const { value, checked } = event.target;
    let newValues;
    if (selectType === 'checkbox') {
      const selectedValues = selectedAnswers[question.id] || [];
      newValues = checked
        ? [...selectedValues, value]
        : selectedValues.filter(opt => opt !== value);
    } else {
      newValues = [value];
    }
    selectedAnswersVar({
      ...selectedAnswers,
      [question.id]: newValues
    });
  };

  const handleWheelScrolling = index => {
    let element = document.getElementById('question-view-' + index)?.offsetTop;
    document.getElementById('take-exam-container')?.scrollTo({
      top: element,
      left: 0,
      behavior: 'smooth'
    });
    setCurrentView(index);
    currentViewRef.current = index;
  };

  useEffect(() => {
    const handleWheel = e => {
      const UpDown = e.deltaY < 0 ? 'up' : 'down';
      let CurrentView = currentViewRef.current;
      if (UpDown === 'up') {
        handleWheelScrolling(CurrentView - 1 <= 0 ? 0 : CurrentView - 1);
        currentViewRef.current = CurrentView - 1 <= 0 ? 0 : CurrentView - 1;
      } else {
        if (CurrentView !== currentSectionScrollLimit.current - 1) {
          let currentCalculation =
            CurrentView + 1 >= currentSectionScrollLimit.current - 1
              ? currentSectionScrollLimit.current - 1
              : CurrentView + 1;
          handleWheelScrolling(currentCalculation);
          currentViewRef.current = currentCalculation;
        }
      }
    };

    const handleWheelEvent = debounce(e => {
      e.stopPropagation();
      handleWheel(e);
    }, 100);

    document.body.style.overflow = 'hidden';
    window.addEventListener('wheel', handleWheelEvent);
    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
    };
  }, []);

  useEffect(() => {
    currentSectionScrollLimit.current = currentExamSection.questions?.length;
  }, [currentExamSection]);

  function isOptionSelected(option, question) {
    const selectedValues = selectedAnswers[question.id] || [];
    return selectedValues.includes(option);
  }

  const styles = {
    slideContainer: {
      height: '98vh'
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 750) setAbove750(true);
      else setAbove750(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function renderForm() {
    return (
      <div id="take-exam-container" className="take-exam-container">
        {currentExamSection.questions.map((question, index) => {
          // questions in the same page share the first question audio
          const firstQuestion = currentExamSection.questions[0];
          question = { ...question, audio: question.audio ?? firstQuestion.audio };
          const selectType = question.correctOptions.length > 1 ? 'checkbox' : 'radio';
          return (
            <div className="exam-questions-max-parent" key={question.id}>
              <div
                id={'question-view-' + index}
                className="question-view"
                style={{ border: '1px solid blue' }}
              >
                <div
                  className={
                    !question.image
                      ? 'tachometer-replacement__no-image'
                      : 'tachometer-replacement'
                  }
                  style={{
                    height:
                      !question.image && !question.audio
                        ? '30%'
                        : !question.audio
                        ? Viewport < 750
                          ? '23%'
                          : '30%'
                        : ''
                  }}
                ></div>
                <p className="responsive-exam-command">{question.command}</p>
                <div className="question-view-container">
                  <Question
                    key={question.id}
                    currentExamQuestion={question}
                    totalSections={totalSections}
                    totalQuestionsInCurrentSection={totalQuestionsInCurrentSection}
                    totalQuestions={totalQuestions}
                    currentQuestionNumber={index}
                    useAudioPlayerColor
                    questionsColorsScheme={examColorScheme}
                    currentExamQuestionRelativeNumber={
                      currentExamQuestionRelativeNumber + index
                    }
                    handleCheckBoxChange={event =>
                      handleCheckBoxChange(event, question, selectType)
                    }
                    TakingExam
                    examColorScheme={examColorScheme}
                    isCheck={option => isOptionSelected(option, question)}
                    selectType={selectType}
                  />
                </div>
                <div className="question-info">
                  <span>
                    Page: {examSectionNumber + 1}/{totalSections}
                  </span>
                  <span>
                    Question:{' '}
                    {QuestionIndex?.indexes?.findIndex(q => q.id == question.id) === -1
                      ? ''
                      : QuestionIndex?.indexes?.findIndex(q => q.id == question.id) + 1}
                    /{totalQuestions}
                  </span>
                </div>

                <div className="questions-buttons d-flex p-2">
                  <div className="question-navigator ">
                    {examSectionNumber > 0 &&
                      index === currentExamSection.questions.length - 1 && (
                        <CrystalButton
                          type="button"
                          onClick={getPreviousExamSection}
                          className="mr-auto prev-question"
                        >
                          Back
                        </CrystalButton>
                      )}
                    {index !== currentExamSection.questions.length - 1 && (
                      <KeyboardArrowDown className="arrow-drop-down" />
                    )}
                    {index === currentExamSection.questions.length - 1 && (
                      <CrystalButton
                        type="button"
                        onClick={getNextExamSection}
                        className="ml-auto  next-question"
                      >
                        {examSectionNumber + 1 === totalSections ? (
                          <Link
                            to={`/results/${examId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            Finish
                          </Link>
                        ) : (
                          'Next'
                        )}
                      </CrystalButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="d-flex flex-column align-items-center">
      <div className="english-test-take-exam">
        <div className="content">
          {!isLoading && (
            <>
              <div className={'tachometer-container'}>
                <Tachometer
                  questions={totalQuestions}
                  correctQuestions={numQuestionsCorrect.length}
                  examColorScheme={examColorScheme}
                  width={'100%'}
                  containerWidth={'30%'}
                  height={'400px'}
                />
              </div>
            </>
          )}
          <form id={ExamAnimationX} style={{ padding: 0 }}>
            {isLoading ? <LoadingSpinner customClasses="m-auto" /> : renderForm()}
          </form>
        </div>
      </div>
    </section>
  );
}

function TakeExamWrapper(props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TakeExam {...props} />
    </ErrorBoundary>
  );
}

// TODO use a Toast component
function ErrorFallback({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      {error.message || 'There was an issue contact the page administrator'}
    </div>
  );
}

export default TakeExamWrapper;
