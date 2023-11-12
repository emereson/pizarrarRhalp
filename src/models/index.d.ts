import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ElementType {
  IMAGE = "IMAGE",
  TEXT = "TEXT"
}

export declare class Skills {
  readonly listenning: number;
  readonly speaking: number;
  readonly writting: number;
  readonly reading: number;
  constructor(init: ModelInit<Skills>);
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly profilePicture?: string;
  readonly files?: (File | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class File {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly url: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<File>);
  static copyOf(source: File, mutator: (draft: MutableModel<File>) => MutableModel<File> | void): File;
}

export declare class ClassRoom {
  readonly id: string;
  readonly name: string;
  readonly page?: number;
  readonly backgroundImageUrl?: string;
  readonly iconsColor?: string;
  readonly isDisabled?: boolean;
  readonly isCrystalTheme?: boolean;
  readonly teachers?: (Teacher | null)[];
  readonly students?: (Student | null)[];
  constructor(init: ModelInit<ClassRoom>);
  static copyOf(source: ClassRoom, mutator: (draft: MutableModel<ClassRoom>) => MutableModel<ClassRoom> | void): ClassRoom;
}

export declare class Teacher {
  readonly id: string;
  readonly classRoom?: ClassRoom;
  readonly user?: User;
  readonly students?: (Student | null)[];
  constructor(init: ModelInit<Teacher>);
  static copyOf(source: Teacher, mutator: (draft: MutableModel<Teacher>) => MutableModel<Teacher> | void): Teacher;
}

export declare class Student {
  readonly id: string;
  readonly classRoom?: ClassRoom;
  readonly user?: User;
  readonly evaluations?: (Evaluation | null)[];
  constructor(init: ModelInit<Student>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

export declare class Evaluation {
  readonly id: string;
  readonly fileId: string;
  readonly studentId: string;
  readonly no: string;
  readonly name?: string;
  readonly process?: string;
  readonly score?: number;
  readonly skills?: Skills;
  readonly date?: string;
  readonly file?: File;
  readonly createdAt?: string;
  constructor(init: ModelInit<Evaluation>);
  static copyOf(source: Evaluation, mutator: (draft: MutableModel<Evaluation>) => MutableModel<Evaluation> | void): Evaluation;
}

export declare class WhiteBoardEvent {
  readonly id: string;
  readonly classRoomId: string;
  readonly page: number;
  readonly updatedAt?: string;
  readonly payload: string;
  constructor(init: ModelInit<WhiteBoardEvent>);
  static copyOf(source: WhiteBoardEvent, mutator: (draft: MutableModel<WhiteBoardEvent>) => MutableModel<WhiteBoardEvent> | void): WhiteBoardEvent;
}

export declare class Level {
  readonly id: string;
  readonly name: string;
  readonly studyDocumentSlides?: (StudyDocumentSlide | null)[];
  readonly orderArray?: string;
  constructor(init: ModelInit<Level>);
  static copyOf(source: Level, mutator: (draft: MutableModel<Level>) => MutableModel<Level> | void): Level;
}

export declare class StudyDocumentSlide {
  readonly id: string;
  readonly levelId: string;
  readonly studyDocumentElements?: (StudyDocumentElement | null)[];
  constructor(init: ModelInit<StudyDocumentSlide>);
  static copyOf(source: StudyDocumentSlide, mutator: (draft: MutableModel<StudyDocumentSlide>) => MutableModel<StudyDocumentSlide> | void): StudyDocumentSlide;
}

export declare class StudyDocumentElement {
  readonly id: string;
  readonly pageId: string;
  readonly type?: ElementType | keyof typeof ElementType;
  readonly value: string;
  constructor(init: ModelInit<StudyDocumentElement>);
  static copyOf(source: StudyDocumentElement, mutator: (draft: MutableModel<StudyDocumentElement>) => MutableModel<StudyDocumentElement> | void): StudyDocumentElement;
}

export declare class EnglishTest {
  readonly id: string;
  readonly minScore?: number;
  readonly maxSCore?: number;
  readonly scoreFeedback?: string;
  readonly correctAnswers?: string;
  readonly correctAnswersFeedback?: string;
  readonly inCorrectAnswers?: string;
  readonly inCorrectAnswersFeedback?: string;
  readonly selectedEvaluations?: (string | null)[];
  readonly questions?: (EnglishTestQuestion | null)[];
  constructor(init: ModelInit<EnglishTest>);
  static copyOf(source: EnglishTest, mutator: (draft: MutableModel<EnglishTest>) => MutableModel<EnglishTest> | void): EnglishTest;
}

export declare class EnglishTestQuestion {
  readonly id: string;
  readonly createdAt?: string;
  readonly englishTestId: string;
  readonly statement?: string;
  readonly optionA?: string;
  readonly optionB?: string;
  readonly optionC?: string;
  readonly optionD?: string;
  readonly correctOptions?: string[];
  readonly image?: string;
  readonly audio?: string;
  readonly needsRecording?: boolean;
  constructor(init: ModelInit<EnglishTestQuestion>);
  static copyOf(source: EnglishTestQuestion, mutator: (draft: MutableModel<EnglishTestQuestion>) => MutableModel<EnglishTestQuestion> | void): EnglishTestQuestion;
}