import { useEffect } from 'react';
import { CREATE_EXAM_SECTION } from '../graphQL/mutations';
import { useMutation } from '@apollo/client';
import { GET_EXAM } from '../graphQL/queries';
import { v4 as uuidv4 } from 'uuid';
import { useCreateQuestion } from './useCreateQuestion';

export const useCreateExamSection = () => {
  const [
    createExamSectionMutation,
    { loading: creatingExamSection, error: errorCreatingExamSection }
  ] = useMutation(CREATE_EXAM_SECTION, { refetchQueries: [GET_EXAM] });
  const { createQuestion } = useCreateQuestion();

  useEffect(() => {
    if (errorCreatingExamSection) {
      console.error(errorCreatingExamSection);
    }
  }, [errorCreatingExamSection]);

  /**
   *
   * @param {string} id
   * @returns {function} createExamMutation
   * Creates a new English Test
   */
  function createExamSectionRequest(examId, createWithoutInitialQuestion) {
    return new Promise(async (response, reject) => {
      const examSectionId = uuidv4();
      await createExamSectionMutation({
        variables: { id: examSectionId, examId }
      });
      // create a question in this new section
      if (!createWithoutInitialQuestion) {
        await createQuestion({
          id: uuidv4(),
          examSectionId
        });
      }

      response(examSectionId);
    });
  }

  return { createExamSectionRequest, creatingExamSection, errorCreatingExamSection };
};
