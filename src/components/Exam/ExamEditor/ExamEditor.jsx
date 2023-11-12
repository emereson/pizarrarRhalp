import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../common/LoadingSpinner';
import CrystalButton from '../../common/CrystalButton';
import TrashIcon from './assets/img/trash-icon.svg';
import ArchiveIcon from './assets/img/archive-icon.svg';
import { useEditQuestion } from './hooks/useEditQuestion';
import { useLoadExam } from '../hooks/useLoadExam';
import { Link } from 'react-router-dom';
import EditTest from './EditTest';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';
import { ReactComponent as PlayIcon } from '../../common/AudioPlayer/assets/play.svg';
import { useReactiveVar } from '@apollo/client';
import {
  examSectionNumberVar,
  examQuestionNumberVar,
  examQuestionEditingValuesVar,
  feedbackEditingValuesVar
} from '../typePolicies';

import { useCreateExamSection } from './hooks/useCreateExamSection';
import { useDeleteExamSection } from './hooks/useDeleteExamSection';
import { useUpdateExamSection } from './hooks/useUpdateExamSection';
import { useUpdateExam } from './hooks/useUpdateExam';
import { useColorScheme } from '../hooks/useColorScheme';
import { EditableCheckBox } from '../CheckBox';

import { useParams } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import ModalSaveExam from '../Modals/ModalSaveExam';
import { useDuplicateExam } from './hooks/useDuplicateExam';

import QuestionNavigator from './QuestionNavigator';
import FeedbackEditor from './feedback';

function ExamEditor() {
  const { examId } = useParams();
  const {
    examData: {
      currentExamSection,
      currentExamQuestion,
      totalSections,
      totalQuestionsInCurrentSection,
      totalQuestions,
      currentExamQuestionRelativeNumber,
      examColorScheme
    },
    loadingExam
  } = useLoadExam(examId);
  const { updateExam, updatingExam } = useUpdateExam();
  const examQuestionNumber = useReactiveVar(examQuestionNumberVar);
  const examSectionNumber = useReactiveVar(examSectionNumberVar);
  const currentExamQuestionEditingValues = useReactiveVar(examQuestionEditingValuesVar);
  const { CurrentColor, setCurrentColor } = useColorScheme();
  const [ExamColorScheme, setExamColorScheme] = useState('standard');

  const {
    createQuestionRequest,
    deleteQuestionRequest,
    deletingQuestion,
    updateQuestionRequest,
    creatingQuestion,
    updatingQuestion
  } = useEditQuestion(examId);

  const { createExamSectionRequest, creatingExamSection } = useCreateExamSection();
  const { deleteExamSectionRequest, deletingExamSection } = useDeleteExamSection();
  const { updateExamSectionRequest, updatingExamSection } = useUpdateExamSection();
  const { receiveData } = useDuplicateExam(examId);
  const [SavingInGallery, setSavingInGallery] = useState(false);
  const [CurrentView] = useState(0);
  const [saveExamModal, setsaveExamModal] = useState(false);

  const isLoading =
    loadingExam ||
    creatingQuestion ||
    creatingExamSection ||
    deletingExamSection ||
    updatingExamSection ||
    updatingExam ||
    SavingInGallery;
  const isDeleting = deletingQuestion;
  const willCreateSection = examSectionNumber + 1 === totalSections;
  const willCreateQuestion = examQuestionNumber + 1 === totalQuestionsInCurrentSection;

  /** Initialize editing data*/
  useEffect(() => {
    if (!loadingExam) {
      const editingValues = examQuestionEditingValuesVar();
      examQuestionEditingValuesVar({
        command: currentExamSection.command,
        ...currentExamQuestion,
        ...editingValues,
        id: currentExamQuestion.id,
        examSectionId: currentExamSection.id,
        image: currentExamQuestion.image,
        audio: currentExamQuestion.audio
      });
    }
  }, [
    currentExamQuestion,
    currentExamSection.command,
    currentExamSection.id,
    loadingExam
  ]);

  const handleExamInGallery = async e => {
    setsaveExamModal(true);
  };

  async function createQuestion() {
    const newQuestionId = uuidv4();
    if (!creatingQuestion) {
      createQuestionRequest(
        { examSectionId: currentExamSection.id, id: newQuestionId },
        examId
      );
    }
    clearEditingValues();
  }

  useEffect(() => {
    setExamColorScheme(examColorScheme);
  }, [examColorScheme]);

  async function createExamSection() {
    if (!creatingExamSection) {
      createExamSectionRequest(examId);
    }
  }

  function clearEditingValues() {
    examQuestionEditingValuesVar({});
  }

  async function deleteQuestion() {
    deleteQuestionRequest(currentExamQuestion);
    getPreviousQuestion();
    clearEditingValues();
  }

  function deleteExamSection() {
    deleteExamSectionRequest(currentExamSection.id, examId);
    getPrevExamSection();
    clearEditingValues();
  }

  async function handleDelete() {
    // do not delete the question if there is only one
    if (totalQuestionsInCurrentSection > 1) {
      deleteQuestion();
      // do not delete the ExamSection if there is only one
    } else if (totalQuestionsInCurrentSection <= 1 && totalSections > 1) {
      deleteExamSection();
    }
  }

  const getPreviousQuestion = () => {
    if (examQuestionNumber > 0) {
      clearEditingValues();
      examQuestionNumberVar(examQuestionNumber - 1);
    }
  };

  const getNextQuestion = () => {
    clearEditingValues();
    if (willCreateQuestion) {
      createQuestion();
    }
    examQuestionNumberVar(examQuestionNumber + 1);
  };

  const getNextExamSection = () => {
    clearEditingValues();
    if (willCreateSection) {
      createExamSection();
    }
    examQuestionNumberVar(0);
    examSectionNumberVar(examSectionNumber + 1);
  };

  const getPrevExamSection = () => {
    if (examSectionNumber > 0) {
      clearEditingValues();
      examQuestionNumberVar(0);
      examSectionNumberVar(examSectionNumber - 1);
    }
  };

  const RenderExamFooter = ({ style, className }) => {
    return (
      <div
        className={
          className ? 'current-page-question' + ' ' + className : 'current-page-question'
        }
        style={style}
      >
        <span>
          Page:{' '}
          <span
            className={
              examSectionNumber + 1 === 0 ? 'alternated-text' : 'alternated-text-filled'
            }
          >
            {examSectionNumber + 1}/{totalSections}
          </span>
        </span>
        <span className="ml-2">
          Question:{' '}
          <span
            className={
              examSectionNumber + 1 === 0 ? 'alternated-text' : 'alternated-text-filled'
            }
          >
            {currentExamQuestionRelativeNumber + 1}/{totalQuestions}
          </span>
        </span>
      </div>
    );
  };

  async function handleSave() {
    // save section data
    updateExamSectionRequest({
      ...currentExamSection,
      command: currentExamQuestionEditingValues.command
    });
    // save question data
    updateQuestionRequest(currentExamQuestionEditingValues);
    // save feedback data
    updateFeedback(feedbackEditingValuesVar());
  }

  const duplicateExam = name =>
    new Promise(async (response, reject) => {
      await receiveData(feedbackEditingValuesVar(), ExamColorScheme, name)
        .then(examId => {
          response(examId);
        })
        .catch(err => {
          reject(err);
          console.error('There-was-an-error->', err);
        });
    });

  function updateFeedback(values) {
    const examFeedback = {
      id: examId,
      minScore: values.score.min,
      maxSCore: values.score.max,
      scoreFeedback: values.score.feedback,
      correctAnswers: values.correct.correctList,
      correctAnswersFeedback: values.correct.feedback,
      inCorrectAnswers: values.incorrect.incorrectList,
      inCorrectAnswersFeedback: values.incorrect.feedback,
      ranks: JSON.stringify(values.ranks),
      selectedEvaluations: [...values.selectedEvaluations],
      examColorScheme: ExamColorScheme
    };
    updateExam(examFeedback);
  }

  return (
    <div className="exam-editor-container">
      <div
        className={
          CurrentColor === 'dark'
            ? 'english-test-admin-dashboard'
            : 'english-test-admin-dashboard__light'
        }
      >
        <div className="content p-3" style={{ height: '100vh' }}>
          <form id="exam-editor-form" className="create-question-form text-center">
            {!isLoading && (
              <div
                className="test-styling-buttons responsive-header"
                style={{ marginTop: 0, borderTop: 'transparent' }}
              >
                <div className="buttons">
                  <label className="exam-header-title" htmlFor="command">
                    Ralph Hodge Test Generator
                  </label>
                  <div
                    className="push-button"
                    onClick={() =>
                      setCurrentColor(CurrentColor === 'dark' ? 'light' : 'dark')
                    }
                    style={{
                      padding: '3.5px 5px',
                      fontSize: '1rem',
                      borderRight: '0 solid transparent'
                    }}
                  >
                    Background color
                    <PlayIcon
                      style={{ marginLeft: '10px', width: '10px', height: '10px' }}
                      aria-label="play audio"
                    />
                  </div>
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="loading-container">
                <LoadingSpinner customClasses="m-auto" />
              </div>
            ) : (
              !loadingExam && (
                <EditTest
                  examId={examId}
                  CurrentView={CurrentView}
                  currentExamQuestionEditingValues={currentExamQuestionEditingValues}
                  currentExamQuestionRelativeNumber={currentExamQuestionRelativeNumber}
                />
              )
            )}
            <div className="d-flex align-items-center mx-4">
              <Hidden smUp>{CurrentView === 0 && <RenderExamFooter />}</Hidden>
              <Hidden smUp>
                {CurrentView === 0 && (
                  <div className="ml-auto">
                    <QuestionNavigator
                      getPrevExamSection={getPrevExamSection}
                      getPreviousQuestion={getPreviousQuestion}
                      creatingQuestion={creatingQuestion}
                      getNextQuestion={getNextQuestion}
                      willCreateQuestion={willCreateQuestion}
                      creatingExamSection={creatingExamSection}
                      getNextExamSection={getNextExamSection}
                      willCreateSection={willCreateSection}
                    />
                  </div>
                )}
              </Hidden>
            </div>
            <div className={'responsive__section-2'}>
              <FeedbackEditor examId={examId} />
            </div>
            {!isLoading && (
              <div className="test-styling-buttons">
                <div className="buttons">
                  {window.innerWidth > 750 && (
                    <div
                      className="push-button"
                      onClick={() =>
                        setCurrentColor(CurrentColor === 'dark' ? 'light' : 'dark')
                      }
                      style={{ padding: '3.5px 5px', fontSize: '1rem' }}
                    >
                      Background color
                      <PlayIcon
                        style={{ marginLeft: '10px', width: '10px', height: '10px' }}
                        aria-label="play audio"
                      />
                    </div>
                  )}
                  <div className="push-button__no-feedback">
                    <p>Exam color</p>
                    <EditableCheckBox
                      labelText={'standard'}
                      small
                      isChecked={ExamColorScheme === 'standard'}
                      value="standard"
                      onCheckBoxChange={e => setExamColorScheme(e.target.value)}
                      inputName="score"
                      examColorMode
                      style={{ fontSize: '1rem' }}
                    />
                    <EditableCheckBox
                      labelText={'yellow'}
                      small
                      isChecked={ExamColorScheme === 'yellow'}
                      value="yellow"
                      onCheckBoxChange={e => setExamColorScheme(e.target.value)}
                      inputName="score"
                      examColorMode
                      style={{ fontSize: '1rem' }}
                    />
                    <EditableCheckBox
                      labelText={'green'}
                      small
                      isChecked={ExamColorScheme === 'green'}
                      value="green"
                      onCheckBoxChange={e => setExamColorScheme(e.target.value)}
                      inputName="score"
                      style={{ fontSize: '1rem' }}
                      examColorMode
                    />
                    <EditableCheckBox
                      labelText={'blue'}
                      small
                      isChecked={ExamColorScheme === 'blue'}
                      value="blue"
                      onCheckBoxChange={e => setExamColorScheme(e.target.value)}
                      inputName="score"
                      examColorMode
                      style={{ fontSize: '1rem' }}
                    />
                  </div>
                </div>
              </div>
            )}
            {!isLoading && (
              <div className="test-editor-footer">
                <div className="test-editor-buttons">
                  {!isLoading && (
                    <RenderExamFooter className="responsive-question-footer" />
                  )}
                  <div className="edit-options-container">
                    <div className="edit-options">
                      <CrystalButton
                        type="button"
                        onClick={handleSave}
                        className="save-btn ml-5"
                      >
                        {updatingQuestion ? <LoadingSpinner /> : 'Save'}
                      </CrystalButton>
                      <CrystalButton
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {deletingQuestion ? (
                          <LoadingSpinner />
                        ) : (
                          <img
                            src={TrashIcon}
                            style={{ width: 27 }}
                            alt="Delete question Icon"
                          />
                        )}
                      </CrystalButton>
                      <CrystalButton type="button" onClick={handleExamInGallery}>
                        {deletingQuestion ? (
                          <LoadingSpinner />
                        ) : (
                          <img
                            src={ArchiveIcon}
                            style={{ width: 27 }}
                            alt="archive exam Icon"
                          />
                        )}
                      </CrystalButton>
                      <CrystalButton
                        type="button"
                        className="save-btn ml-5"
                        customStyles={{ fontSize: window.innerWidth ? '1.3rem' : '1rem' }}
                      >
                        <Link
                          to={`/take-exam/${examId}`}
                          target="_blank"
                          style={{ textDecoration: 'none' }}
                          rel="noopener noreferrer"
                          className="save-btn__link"
                        >
                          Generate
                        </Link>
                      </CrystalButton>
                    </div>
                    <RenderExamFooter />
                  </div>
                  <div className="d-flex p-2 arrow-buttons-question">
                    <QuestionNavigator
                      getPrevExamSection={getPrevExamSection}
                      getPreviousQuestion={getPreviousQuestion}
                      creatingQuestion={creatingQuestion}
                      getNextQuestion={getNextQuestion}
                      willCreateQuestion={willCreateQuestion}
                      creatingExamSection={creatingExamSection}
                      getNextExamSection={getNextExamSection}
                      willCreateSection={willCreateSection}
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        <ModalSaveExam
          show={saveExamModal}
          onHide={() => setsaveExamModal(false)}
          examId={examId}
          setSavingInGallery={setSavingInGallery}
          colorScheme={CurrentColor}
          duplicateExam={duplicateExam}
        />
      </div>
    </div>
  );
}

function ExamEditorWrapper(props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ExamEditor {...props} />
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

export default ExamEditorWrapper;
