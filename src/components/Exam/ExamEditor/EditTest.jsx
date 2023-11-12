import React from 'react';
import Question from '../Question';
import { useEditQuestion } from './hooks/useEditQuestion';
import { useReactiveVar } from '@apollo/client';
import { examQuestionNumberVar } from '../typePolicies';

function EditTest({
  examId,
  currentExamQuestionEditingValues,
  currentExamQuestionRelativeNumber
}) {
  const examQuestionNumber = useReactiveVar(examQuestionNumberVar);
  const {
    handleInputChange,
    handleCheckBoxChange,
    isOptionChecked,
    handleNeedsRecordingChange
  } = useEditQuestion(examId);

  return (
    <>
      <div className={'responsive__section-1'}>
        <Question
          currentQuestionNumber={examQuestionNumber}
          currentExamQuestion={currentExamQuestionEditingValues}
          currentExamQuestionRelativeNumber={currentExamQuestionRelativeNumber}
          handleInputChange={handleInputChange}
          handleCheckBoxChange={handleCheckBoxChange}
          handleNeedsRecordingChange={handleNeedsRecordingChange}
          isEditable
          isCheck={isOptionChecked}
        />
      </div>
    </>
  );
}

export default EditTest;
