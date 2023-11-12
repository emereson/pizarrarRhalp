import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { EditableCheckBox, CheckBox } from '../CheckBox';
import defaultQuesitonImage from '../ExamEditor/assets/img/background.svg';
import MicIconOff from '../ExamEditor/assets/img/mic_green.svg';
import MicIconOffBlack from '../ExamEditor/assets/img/mic_black.svg';
import MicIconOn from '../ExamEditor/assets/img/mic-on.svg';
import MicIconOnBlack from '../ExamEditor/assets/img/mic-on_black.svg';
import upload from '../ExamEditor/assets/img/speaker_green.svg';
import uploadBlack from '../ExamEditor/assets/img/speaker_black.svg';
import uploadFilled from '../ExamEditor/assets/img/speaker-green-filled.svg';
import uploadBlackFilled from '../ExamEditor/assets/img/speaker-blue-filled.svg';
import { S3Service } from '../../../services/S3.service';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useUpdateQuestion } from '../ExamEditor/hooks/useUpdateQuestion';
import AudioPlayer from '../../common/AudioPlayer';
import CrystalButton from '../../common/CrystalButton';
import './styles.scss';
import { useColorScheme } from '../hooks/useColorScheme';

const s3Service = new S3Service();

function Question({
  currentQuestionNumber,
  currentExamQuestion = {},
  currentExamQuestionRelativeNumber,
  handleInputChange,
  handleCheckBoxChange,
  handleNeedsRecordingChange,
  useAudioPlayerColor,
  isEditable = false,
  examColorScheme,
  isCheck,
  TakingExam,
  selectType = 'checkbox'
}) {
  const CheckBoxComponent = isEditable ? EditableCheckBox : CheckBox;
  const showCommandText =
    isEditable || (currentExamQuestion.command && currentQuestionNumber === 0);
  const showImage = currentExamQuestion.image || isEditable;
  const { CurrentColor } = useColorScheme();

  const handleChangeColors = () => {
    if (examColorScheme == 'yellow') {
      return '__yellow-scheme';
    }
    if (examColorScheme == 'blue') {
      return '__blue-scheme';
    }
    if (examColorScheme == 'green') {
      return '__green-scheme';
    }
    return '';
  };

  return (
    <section
      className={TakingExam ? `question${handleChangeColors()}` : 'question'}
      data-is-editable={isEditable}
    >
      {!TakingExam && (
        <div className="command m-2 exam-header">
          {isEditable && (
            <label className="exam-header-title" htmlFor="command">
              Command:
            </label>
          )}
          {showCommandText && (
            <TextareaAutosize
              id="command"
              value={currentExamQuestion.command}
              onChange={handleInputChange}
              name="command"
              type="text"
              disabled={!isEditable}
              className="command__text outlineNone"
              style={{ border: 'transparent' }}
              spellCheck="false"
            />
          )}
        </div>
      )}
      <div
        className={TakingExam ? 'audio-options-exam' : 'audio-options'}
        style={{
          marginBottom: 0
        }}
      >
        {isEditable && (
          <CrystalButton
            className="mr-2"
            type="button"
            onClick={handleNeedsRecordingChange}
            title="should record voice"
          >
            <img
              src={
                CurrentColor === 'dark'
                  ? currentExamQuestion.needsRecording
                    ? MicIconOn
                    : MicIconOff
                  : currentExamQuestion.needsRecording
                  ? MicIconOnBlack
                  : MicIconOffBlack
              }
              alt="should record audio"
              style={{ width: 20, height: 20 }}
              className="audio-options__record"
            />
          </CrystalButton>
        )}

        <QuestionAudio
          questionId={currentExamQuestion.id}
          audio={currentExamQuestion.audio}
          isEditable={isEditable}
          usePlayerColor={useAudioPlayerColor}
          colorScheme={CurrentColor}
        />
      </div>
      <div
        className="form-body container-fluid"
        style={{ height: !TakingExam && 'fit-content' }}
      >
        <div
          className="question-body"
          style={{
            justifyContent: !TakingExam ? 'space-around' : 'center'
          }}
        >
          {showImage && (
            <div
              className={
                TakingExam ? 'question-body__image-container q-image__taking-exam' : ''
              }
              style={{
                position: TakingExam ? 'absolute' : 'relative',
                width: !TakingExam && !currentExamQuestion.image ? '20.3%' : ''
              }}
            >
              <QuestionImage
                isEditable={isEditable}
                useTakingExamDimentions={TakingExam}
                questionId={currentExamQuestion.id}
                image={currentExamQuestion.image}
              />
            </div>
          )}
          <div
            className={
              TakingExam ? 'question-body__width-defined' : 'question-body__options'
            }
            style={{
              height: !currentExamQuestion.image && TakingExam ? '50vh' : 'inherit'
            }}
          >
            <div
              className={TakingExam ? 'statement-taking-exam' : 'statement'}
              data-is-editable={isEditable}
            >
              {isEditable ? (
                <input
                  type="text"
                  value={currentExamQuestionRelativeNumber + 1}
                  disabled
                  className="statement__question-number statement-input"
                />
              ) : (
                <></>
              )}
              {isEditable ? (
                <input
                  value={currentExamQuestion.statement}
                  onChange={handleInputChange}
                  name="statement"
                  type="text"
                  className="statement__text statement-input"
                  disabled={!isEditable}
                  spellCheck="false"
                />
              ) : (
                <p
                  className={
                    window.location.href.includes('take-exam')
                      ? 'statement__exam-text'
                      : 'statement__text'
                  }
                  style={{
                    height:
                      currentExamQuestion.statement.length > 80 ? 92.5 : 'fit-content'
                  }}
                >
                  <div className="statement__question-number" style={{ width: '20%' }}>
                    <p>{currentExamQuestionRelativeNumber + 1}</p>
                  </div>{' '}
                  {currentExamQuestion.statement}
                </p>
              )}
            </div>
            <div
              className="options-container"
              style={{
                height:
                  !currentExamQuestion.image &&
                  window.location.href.includes('take-exam') &&
                  '38vh'
              }}
            >
              {(window.location.href.includes('take-exam')
                ? currentExamQuestion.optionA
                : true) && (
                <div
                  className={window.innerWidth < 750 ? 'options' : 'mb-2 options'}
                  id="answer-option-A"
                >
                  <CheckBoxComponent
                    type={selectType}
                    isChecked={isCheck('A')}
                    textValue={currentExamQuestion.optionA}
                    onCheckBoxChange={handleCheckBoxChange}
                    onInputChange={handleInputChange}
                    inputName={selectType === 'radio' ? currentExamQuestion.id : 'A'}
                    textInputName="optionA"
                    value="A"
                    isEditable={isEditable}
                  />
                </div>
              )}
              {(window.location.href.includes('take-exam')
                ? currentExamQuestion.optionB
                : true) && (
                <div
                  className={window.innerWidth < 750 ? 'options' : 'mb-2 options'}
                  id="answer-option-B"
                >
                  <CheckBoxComponent
                    type={selectType}
                    isChecked={isCheck('B')}
                    textValue={currentExamQuestion.optionB}
                    onCheckBoxChange={handleCheckBoxChange}
                    onInputChange={handleInputChange}
                    inputName={selectType === 'radio' ? currentExamQuestion.id : 'B'}
                    textInputName="optionB"
                    value="B"
                    isEditable={isEditable}
                  />
                </div>
              )}
              {(window.location.href.includes('take-exam')
                ? currentExamQuestion.optionC
                : true) && (
                <div
                  className={window.innerWidth < 750 ? 'options' : 'mb-2 options'}
                  id="answer-option-C"
                >
                  <CheckBoxComponent
                    type={selectType}
                    isChecked={isCheck('C')}
                    textValue={currentExamQuestion.optionC}
                    onCheckBoxChange={handleCheckBoxChange}
                    onInputChange={handleInputChange}
                    inputName={selectType === 'radio' ? currentExamQuestion.id : 'C'}
                    textInputName="optionC"
                    value="C"
                    isEditable={isEditable}
                  />
                </div>
              )}
              {(window.location.href.includes('take-exam')
                ? currentExamQuestion.optionD
                : true) && (
                <div
                  className={window.innerWidth < 750 ? 'options' : 'mb-2 options'}
                  id="answer-option-D"
                >
                  <CheckBoxComponent
                    type={selectType}
                    isChecked={isCheck('D')}
                    textValue={currentExamQuestion.optionD}
                    onCheckBoxChange={handleCheckBoxChange}
                    onInputChange={handleInputChange}
                    inputName={selectType === 'radio' ? currentExamQuestion.id : 'D'}
                    textInputName="optionD"
                    value="D"
                    isEditable={isEditable}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionAudio({ questionId, audio, isEditable, colorScheme, usePlayerColor }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const { updateQuestionAudio } = useUpdateQuestion();

  useEffect(() => {
    if (!loadingAudio && audio) {
      getPresignedUrl();
    } else {
      setAudioUrl(null);
    }
    async function getPresignedUrl() {
      setLoadingAudio(true);
      const presignedUrl = await s3Service.getPresignedUrl(audio);
      setAudioUrl(presignedUrl);
      setLoadingAudio(false);
    }
  }, [questionId, audio]);

  async function handleUploadAudio(event) {
    setLoadingAudio(true);
    const file = event.target.files[0];
    const fileName = `englishTest/question-${questionId}/${file.name}`;
    if (audio) {
      await s3Service.deleteFileByName(audio);
    }
    updateQuestionAudio({
      variables: {
        id: questionId,
        audio: fileName
      }
    });
    const { presignedUrl } = await s3Service.uploadFile({ name: fileName, blob: file });
    setAudioUrl(presignedUrl);
    setLoadingAudio(false);
  }

  if (loadingAudio) {
    return <LoadingSpinner />;
  }

  return (
    <div className="question-audio d-flex align-items-center w-100">
      {isEditable && (
        <>
          <label htmlFor="upload-audio" className="d-block question-audio__upload-audio">
            <img
              src={
                !audio
                  ? colorScheme == 'dark'
                    ? upload
                    : uploadBlack
                  : colorScheme == 'dark'
                  ? uploadFilled
                  : uploadBlackFilled
              }
              alt="upload audio"
              title="upload audio file"
              className="audio-options__audio"
            />
          </label>
          <input
            type="file"
            id="upload-audio"
            className="d-none"
            onChange={handleUploadAudio}
          />
        </>
      )}
      {audioUrl && (
        <AudioPlayer
          fullWidth
          usePlayerColor={usePlayerColor}
          audioSrc={audioUrl}
          colorScheme={colorScheme}
        />
      )}
    </div>
  );
}

function QuestionImage({ questionId, image, isEditable, useTakingExamDimentions }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const imageSrc = imageUrl || defaultQuesitonImage;
  const { updateQuestionImage } = useUpdateQuestion();

  useEffect(() => {
    if (!loadingImage && image) {
      getPresignedUrl();
    } else {
      setImageUrl(null);
    }
    async function getPresignedUrl() {
      setLoadingImage(true);
      const presignedUrl = await s3Service.getPresignedUrl(image);
      setImageUrl(presignedUrl);
      setLoadingImage(false);
    }
  }, [questionId, image]);

  async function handleUploadImage(event) {
    setLoadingImage(true);
    const file = event.target.files[0];
    const fileName = `englishTest/question-${questionId}/${file.name}`;
    if (image) {
      await s3Service.deleteFileByName(image);
    }
    updateQuestionImage({
      variables: {
        id: questionId,
        image: fileName
      }
    });
    try {
      const { presignedUrl } = await s3Service.uploadImage({
        name: fileName,
        blob: file
      });
      setImageUrl(presignedUrl);
    } catch (error) {
      alert(error);
    }
    setLoadingImage(false);
  }

  return (
    <div
      className={
        useTakingExamDimentions
          ? 'question-image question-image-usetakingdimentions'
          : 'question-image'
      }
      style={
        !useTakingExamDimentions
          ? {
              maxHeight: useTakingExamDimentions ? '300px' : '170px',
              height: useTakingExamDimentions || '170px',
              border: useTakingExamDimentions && 'none'
            }
          : null
      }
    >
      {loadingImage && <LoadingSpinner />}
      {!loadingImage && (
        <>
          <img
            className="question-image__image"
            src={imageSrc}
            alt="question"
            width="250"
            height="150"
          />
          {isEditable && (
            <label className="position-absolute w-100 h-100">
              <input
                type="file"
                id="upload-image"
                className="d-none"
                onChange={handleUploadImage}
              />
            </label>
          )}
        </>
      )}
    </div>
  );
}

export default Question;
