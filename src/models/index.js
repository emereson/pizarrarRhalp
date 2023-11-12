// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ElementType = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT'
};

const {
  User,
  File,
  ClassRoom,
  Teacher,
  Student,
  Evaluation,
  WhiteBoardEvent,
  Level,
  StudyDocumentSlide,
  StudyDocumentElement,
  EnglishTest,
  EnglishTestQuestion,
  Skills
} = initSchema(schema);

export {
  User,
  File,
  ClassRoom,
  Teacher,
  Student,
  Evaluation,
  WhiteBoardEvent,
  Level,
  StudyDocumentSlide,
  StudyDocumentElement,
  EnglishTest,
  EnglishTestQuestion,
  ElementType,
  Skills
};
