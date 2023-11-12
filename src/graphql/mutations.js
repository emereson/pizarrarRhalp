/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWhiteBoardEvent = /* GraphQL */ `
  mutation CreateWhiteBoardEvent(
    $input: CreateWhiteBoardEventInput!
    $condition: ModelWhiteBoardEventConditionInput
  ) {
    createWhiteBoardEvent(input: $input, condition: $condition) {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const updateWhiteBoardEvent = /* GraphQL */ `
  mutation UpdateWhiteBoardEvent(
    $input: UpdateWhiteBoardEventInput!
    $condition: ModelWhiteBoardEventConditionInput
  ) {
    updateWhiteBoardEvent(input: $input, condition: $condition) {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const deleteWhiteBoardEvent = /* GraphQL */ `
  mutation DeleteWhiteBoardEvent(
    $input: DeleteWhiteBoardEventInput!
    $condition: ModelWhiteBoardEventConditionInput
  ) {
    deleteWhiteBoardEvent(input: $input, condition: $condition) {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const createClassRoom = /* GraphQL */ `
  mutation CreateClassRoom(
    $input: CreateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    createClassRoom(input: $input, condition: $condition) {
      id
      name
      page
      backgroundImageUrl
      iconsColor
      blur
      isDisabled
      isCrystalTheme
      teachers {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateClassRoom = /* GraphQL */ `
  mutation UpdateClassRoom(
    $input: UpdateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    updateClassRoom(input: $input, condition: $condition) {
      id
      name
      page
      backgroundImageUrl
      iconsColor
      blur
      isDisabled
      isCrystalTheme
      teachers {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteClassRoom = /* GraphQL */ `
  mutation DeleteClassRoom(
    $input: DeleteClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    deleteClassRoom(input: $input, condition: $condition) {
      id
      name
      page
      backgroundImageUrl
      iconsColor
      blur
      isDisabled
      isCrystalTheme
      teachers {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      profilePicture
      files {
        items {
          id
          userId
          name
          url
          mode
          currentFolder
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      profilePicture
      files {
        items {
          id
          userId
          name
          url
          mode
          currentFolder
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      profilePicture
      files {
        items {
          id
          userId
          name
          url
          mode
          currentFolder
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTeacher = /* GraphQL */ `
  mutation CreateTeacher(
    $input: CreateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    createTeacher(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const updateTeacher = /* GraphQL */ `
  mutation UpdateTeacher(
    $input: UpdateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    updateTeacher(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeacher = /* GraphQL */ `
  mutation DeleteTeacher(
    $input: DeleteTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    deleteTeacher(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      students {
        items {
          id
          classRoomId
          callingState
          callingInit
          callingBlock
          callingOneBlock
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      evaluations {
        items {
          id
          fileId
          studentId
          no
          name
          process
          score
          date
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      evaluations {
        items {
          id
          fileId
          studentId
          no
          name
          process
          score
          date
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      classRoomId
      classRoom {
        id
        name
        page
        backgroundImageUrl
        iconsColor
        blur
        isDisabled
        isCrystalTheme
        teachers {
          nextToken
        }
        students {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        profilePicture
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      evaluations {
        items {
          id
          fileId
          studentId
          no
          name
          process
          score
          date
          createdAt
          updatedAt
        }
        nextToken
      }
      callingState
      callingInit
      callingBlock
      callingOneBlock
      createdAt
      updatedAt
    }
  }
`;
export const createEvaluation = /* GraphQL */ `
  mutation CreateEvaluation(
    $input: CreateEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    createEvaluation(input: $input, condition: $condition) {
      id
      fileId
      studentId
      no
      name
      process
      score
      skills {
        listenning
        speaking
        writting
        reading
      }
      date
      file {
        id
        userId
        name
        url
        mode
        currentFolder
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEvaluation = /* GraphQL */ `
  mutation UpdateEvaluation(
    $input: UpdateEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    updateEvaluation(input: $input, condition: $condition) {
      id
      fileId
      studentId
      no
      name
      process
      score
      skills {
        listenning
        speaking
        writting
        reading
      }
      date
      file {
        id
        userId
        name
        url
        mode
        currentFolder
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvaluation = /* GraphQL */ `
  mutation DeleteEvaluation(
    $input: DeleteEvaluationInput!
    $condition: ModelEvaluationConditionInput
  ) {
    deleteEvaluation(input: $input, condition: $condition) {
      id
      fileId
      studentId
      no
      name
      process
      score
      skills {
        listenning
        speaking
        writting
        reading
      }
      date
      file {
        id
        userId
        name
        url
        mode
        currentFolder
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFile = /* GraphQL */ `
  mutation CreateFile($input: CreateFileInput!, $condition: ModelFileConditionInput) {
    createFile(input: $input, condition: $condition) {
      id
      userId
      name
      url
      mode
      currentFolder
      createdAt
      updatedAt
    }
  }
`;
export const updateFile = /* GraphQL */ `
  mutation UpdateFile($input: UpdateFileInput!, $condition: ModelFileConditionInput) {
    updateFile(input: $input, condition: $condition) {
      id
      userId
      name
      url
      mode
      currentFolder
      createdAt
      updatedAt
    }
  }
`;
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile($input: DeleteFileInput!, $condition: ModelFileConditionInput) {
    deleteFile(input: $input, condition: $condition) {
      id
      userId
      name
      url
      mode
      currentFolder
      createdAt
      updatedAt
    }
  }
`;
export const createLevel = /* GraphQL */ `
  mutation CreateLevel($input: CreateLevelInput!, $condition: ModelLevelConditionInput) {
    createLevel(input: $input, condition: $condition) {
      id
      name
      studyDocumentSlides {
        items {
          id
          levelId
          createdAt
          updatedAt
        }
        nextToken
      }
      orderArray
      createdAt
      updatedAt
    }
  }
`;
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel($input: UpdateLevelInput!, $condition: ModelLevelConditionInput) {
    updateLevel(input: $input, condition: $condition) {
      id
      name
      studyDocumentSlides {
        items {
          id
          levelId
          createdAt
          updatedAt
        }
        nextToken
      }
      orderArray
      createdAt
      updatedAt
    }
  }
`;
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel($input: DeleteLevelInput!, $condition: ModelLevelConditionInput) {
    deleteLevel(input: $input, condition: $condition) {
      id
      name
      studyDocumentSlides {
        items {
          id
          levelId
          createdAt
          updatedAt
        }
        nextToken
      }
      orderArray
      createdAt
      updatedAt
    }
  }
`;
export const createStudyDocumentSlide = /* GraphQL */ `
  mutation CreateStudyDocumentSlide(
    $input: CreateStudyDocumentSlideInput!
    $condition: ModelStudyDocumentSlideConditionInput
  ) {
    createStudyDocumentSlide(input: $input, condition: $condition) {
      id
      levelId
      studyDocumentElements {
        items {
          id
          pageId
          type
          value
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStudyDocumentSlide = /* GraphQL */ `
  mutation UpdateStudyDocumentSlide(
    $input: UpdateStudyDocumentSlideInput!
    $condition: ModelStudyDocumentSlideConditionInput
  ) {
    updateStudyDocumentSlide(input: $input, condition: $condition) {
      id
      levelId
      studyDocumentElements {
        items {
          id
          pageId
          type
          value
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudyDocumentSlide = /* GraphQL */ `
  mutation DeleteStudyDocumentSlide(
    $input: DeleteStudyDocumentSlideInput!
    $condition: ModelStudyDocumentSlideConditionInput
  ) {
    deleteStudyDocumentSlide(input: $input, condition: $condition) {
      id
      levelId
      studyDocumentElements {
        items {
          id
          pageId
          type
          value
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStudyDocumentElement = /* GraphQL */ `
  mutation CreateStudyDocumentElement(
    $input: CreateStudyDocumentElementInput!
    $condition: ModelStudyDocumentElementConditionInput
  ) {
    createStudyDocumentElement(input: $input, condition: $condition) {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateStudyDocumentElement = /* GraphQL */ `
  mutation UpdateStudyDocumentElement(
    $input: UpdateStudyDocumentElementInput!
    $condition: ModelStudyDocumentElementConditionInput
  ) {
    updateStudyDocumentElement(input: $input, condition: $condition) {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudyDocumentElement = /* GraphQL */ `
  mutation DeleteStudyDocumentElement(
    $input: DeleteStudyDocumentElementInput!
    $condition: ModelStudyDocumentElementConditionInput
  ) {
    deleteStudyDocumentElement(input: $input, condition: $condition) {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const createExam = /* GraphQL */ `
  mutation CreateExam($input: CreateExamInput!, $condition: ModelExamConditionInput) {
    createExam(input: $input, condition: $condition) {
      id
      minScore
      maxSCore
      scoreFeedback
      correctAnswers
      correctAnswersFeedback
      inCorrectAnswers
      inCorrectAnswersFeedback
      ranks
      selectedEvaluations
      examSections {
        items {
          id
          command
          createdAt
          examId
          updatedAt
        }
        nextToken
      }
      examColorScheme
      createdAt
      updatedAt
    }
  }
`;
export const updateExam = /* GraphQL */ `
  mutation UpdateExam($input: UpdateExamInput!, $condition: ModelExamConditionInput) {
    updateExam(input: $input, condition: $condition) {
      id
      minScore
      maxSCore
      scoreFeedback
      correctAnswers
      correctAnswersFeedback
      inCorrectAnswers
      inCorrectAnswersFeedback
      ranks
      selectedEvaluations
      examSections {
        items {
          id
          command
          createdAt
          examId
          updatedAt
        }
        nextToken
      }
      examColorScheme
      createdAt
      updatedAt
    }
  }
`;
export const deleteExam = /* GraphQL */ `
  mutation DeleteExam($input: DeleteExamInput!, $condition: ModelExamConditionInput) {
    deleteExam(input: $input, condition: $condition) {
      id
      minScore
      maxSCore
      scoreFeedback
      correctAnswers
      correctAnswersFeedback
      inCorrectAnswers
      inCorrectAnswersFeedback
      ranks
      selectedEvaluations
      examSections {
        items {
          id
          command
          createdAt
          examId
          updatedAt
        }
        nextToken
      }
      examColorScheme
      createdAt
      updatedAt
    }
  }
`;
export const createExamSection = /* GraphQL */ `
  mutation CreateExamSection(
    $input: CreateExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    createExamSection(input: $input, condition: $condition) {
      id
      command
      createdAt
      examId
      questions {
        items {
          id
          createdAt
          examSectionId
          statement
          optionA
          optionB
          optionC
          optionD
          correctOptions
          image
          audio
          needsRecording
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateExamSection = /* GraphQL */ `
  mutation UpdateExamSection(
    $input: UpdateExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    updateExamSection(input: $input, condition: $condition) {
      id
      command
      createdAt
      examId
      questions {
        items {
          id
          createdAt
          examSectionId
          statement
          optionA
          optionB
          optionC
          optionD
          correctOptions
          image
          audio
          needsRecording
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteExamSection = /* GraphQL */ `
  mutation DeleteExamSection(
    $input: DeleteExamSectionInput!
    $condition: ModelExamSectionConditionInput
  ) {
    deleteExamSection(input: $input, condition: $condition) {
      id
      command
      createdAt
      examId
      questions {
        items {
          id
          createdAt
          examSectionId
          statement
          optionA
          optionB
          optionC
          optionD
          correctOptions
          image
          audio
          needsRecording
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createExamQuestion = /* GraphQL */ `
  mutation CreateExamQuestion(
    $input: CreateExamQuestionInput!
    $condition: ModelExamQuestionConditionInput
  ) {
    createExamQuestion(input: $input, condition: $condition) {
      id
      createdAt
      examSectionId
      statement
      optionA
      optionB
      optionC
      optionD
      correctOptions
      image
      audio
      needsRecording
      updatedAt
    }
  }
`;
export const updateExamQuestion = /* GraphQL */ `
  mutation UpdateExamQuestion(
    $input: UpdateExamQuestionInput!
    $condition: ModelExamQuestionConditionInput
  ) {
    updateExamQuestion(input: $input, condition: $condition) {
      id
      createdAt
      examSectionId
      statement
      optionA
      optionB
      optionC
      optionD
      correctOptions
      image
      audio
      needsRecording
      updatedAt
    }
  }
`;
export const deleteExamQuestion = /* GraphQL */ `
  mutation DeleteExamQuestion(
    $input: DeleteExamQuestionInput!
    $condition: ModelExamQuestionConditionInput
  ) {
    deleteExamQuestion(input: $input, condition: $condition) {
      id
      createdAt
      examSectionId
      statement
      optionA
      optionB
      optionC
      optionD
      correctOptions
      image
      audio
      needsRecording
      updatedAt
    }
  }
`;
export const createSlideObjectCoords = /* GraphQL */ `
  mutation CreateSlideObjectCoords(
    $input: CreateSlideObjectCoordsInput!
    $condition: ModelSlideObjectCoordsConditionInput
  ) {
    createSlideObjectCoords(input: $input, condition: $condition) {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const updateSlideObjectCoords = /* GraphQL */ `
  mutation UpdateSlideObjectCoords(
    $input: UpdateSlideObjectCoordsInput!
    $condition: ModelSlideObjectCoordsConditionInput
  ) {
    updateSlideObjectCoords(input: $input, condition: $condition) {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const deleteSlideObjectCoords = /* GraphQL */ `
  mutation DeleteSlideObjectCoords(
    $input: DeleteSlideObjectCoordsInput!
    $condition: ModelSlideObjectCoordsConditionInput
  ) {
    deleteSlideObjectCoords(input: $input, condition: $condition) {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const createSlideImage = /* GraphQL */ `
  mutation CreateSlideImage(
    $input: CreateSlideImageInput!
    $condition: ModelSlideImageConditionInput
  ) {
    createSlideImage(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      imageUrl
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideImagesId
      slideImageCoordsId
    }
  }
`;
export const updateSlideImage = /* GraphQL */ `
  mutation UpdateSlideImage(
    $input: UpdateSlideImageInput!
    $condition: ModelSlideImageConditionInput
  ) {
    updateSlideImage(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      imageUrl
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideImagesId
      slideImageCoordsId
    }
  }
`;
export const deleteSlideImage = /* GraphQL */ `
  mutation DeleteSlideImage(
    $input: DeleteSlideImageInput!
    $condition: ModelSlideImageConditionInput
  ) {
    deleteSlideImage(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      imageUrl
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideImagesId
      slideImageCoordsId
    }
  }
`;
export const createSlideText = /* GraphQL */ `
  mutation CreateSlideText(
    $input: CreateSlideTextInput!
    $condition: ModelSlideTextConditionInput
  ) {
    createSlideText(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      text
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideTextsId
      slideTextCoordsId
    }
  }
`;
export const updateSlideText = /* GraphQL */ `
  mutation UpdateSlideText(
    $input: UpdateSlideTextInput!
    $condition: ModelSlideTextConditionInput
  ) {
    updateSlideText(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      text
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideTextsId
      slideTextCoordsId
    }
  }
`;
export const deleteSlideText = /* GraphQL */ `
  mutation DeleteSlideText(
    $input: DeleteSlideTextInput!
    $condition: ModelSlideTextConditionInput
  ) {
    deleteSlideText(input: $input, condition: $condition) {
      id
      x
      y
      width
      height
      text
      styles
      coords {
        id
        x
        y
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      learningContentSlideTextsId
      slideTextCoordsId
    }
  }
`;
export const createLearningContentSlide = /* GraphQL */ `
  mutation CreateLearningContentSlide(
    $input: CreateLearningContentSlideInput!
    $condition: ModelLearningContentSlideConditionInput
  ) {
    createLearningContentSlide(input: $input, condition: $condition) {
      id
      timestamp
      texts {
        items {
          id
          x
          y
          width
          height
          text
          styles
          createdAt
          updatedAt
          learningContentSlideTextsId
          slideTextCoordsId
        }
        nextToken
      }
      images {
        items {
          id
          x
          y
          width
          height
          imageUrl
          styles
          createdAt
          updatedAt
          learningContentSlideImagesId
          slideImageCoordsId
        }
        nextToken
      }
      exportedImage
      numberToSort
      minCalification
      realCalification
      createdAt
      updatedAt
      studentsLevelsSlidesId
    }
  }
`;
export const updateLearningContentSlide = /* GraphQL */ `
  mutation UpdateLearningContentSlide(
    $input: UpdateLearningContentSlideInput!
    $condition: ModelLearningContentSlideConditionInput
  ) {
    updateLearningContentSlide(input: $input, condition: $condition) {
      id
      timestamp
      texts {
        items {
          id
          x
          y
          width
          height
          text
          styles
          createdAt
          updatedAt
          learningContentSlideTextsId
          slideTextCoordsId
        }
        nextToken
      }
      images {
        items {
          id
          x
          y
          width
          height
          imageUrl
          styles
          createdAt
          updatedAt
          learningContentSlideImagesId
          slideImageCoordsId
        }
        nextToken
      }
      exportedImage
      numberToSort
      minCalification
      realCalification
      createdAt
      updatedAt
      studentsLevelsSlidesId
    }
  }
`;
export const deleteLearningContentSlide = /* GraphQL */ `
  mutation DeleteLearningContentSlide(
    $input: DeleteLearningContentSlideInput!
    $condition: ModelLearningContentSlideConditionInput
  ) {
    deleteLearningContentSlide(input: $input, condition: $condition) {
      id
      timestamp
      texts {
        items {
          id
          x
          y
          width
          height
          text
          styles
          createdAt
          updatedAt
          learningContentSlideTextsId
          slideTextCoordsId
        }
        nextToken
      }
      images {
        items {
          id
          x
          y
          width
          height
          imageUrl
          styles
          createdAt
          updatedAt
          learningContentSlideImagesId
          slideImageCoordsId
        }
        nextToken
      }
      exportedImage
      numberToSort
      minCalification
      realCalification
      createdAt
      updatedAt
      studentsLevelsSlidesId
    }
  }
`;
export const createStudentsLevels = /* GraphQL */ `
  mutation CreateStudentsLevels(
    $input: CreateStudentsLevelsInput!
    $condition: ModelStudentsLevelsConditionInput
  ) {
    createStudentsLevels(input: $input, condition: $condition) {
      id
      content
      slides {
        items {
          id
          timestamp
          exportedImage
          numberToSort
          minCalification
          realCalification
          createdAt
          updatedAt
          studentsLevelsSlidesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStudentsLevels = /* GraphQL */ `
  mutation UpdateStudentsLevels(
    $input: UpdateStudentsLevelsInput!
    $condition: ModelStudentsLevelsConditionInput
  ) {
    updateStudentsLevels(input: $input, condition: $condition) {
      id
      content
      slides {
        items {
          id
          timestamp
          exportedImage
          numberToSort
          minCalification
          realCalification
          createdAt
          updatedAt
          studentsLevelsSlidesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudentsLevels = /* GraphQL */ `
  mutation DeleteStudentsLevels(
    $input: DeleteStudentsLevelsInput!
    $condition: ModelStudentsLevelsConditionInput
  ) {
    deleteStudentsLevels(input: $input, condition: $condition) {
      id
      content
      slides {
        items {
          id
          timestamp
          exportedImage
          numberToSort
          minCalification
          realCalification
          createdAt
          updatedAt
          studentsLevelsSlidesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserStudyProgress = /* GraphQL */ `
  mutation CreateUserStudyProgress(
    $input: CreateUserStudyProgressInput!
    $condition: ModelUserStudyProgressConditionInput
  ) {
    createUserStudyProgress(input: $input, condition: $condition) {
      id
      owner
      name
      progress
      lastSlideID
      level
      createdAt
      updatedAt
    }
  }
`;
export const updateUserStudyProgress = /* GraphQL */ `
  mutation UpdateUserStudyProgress(
    $input: UpdateUserStudyProgressInput!
    $condition: ModelUserStudyProgressConditionInput
  ) {
    updateUserStudyProgress(input: $input, condition: $condition) {
      id
      owner
      name
      progress
      lastSlideID
      level
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserStudyProgress = /* GraphQL */ `
  mutation DeleteUserStudyProgress(
    $input: DeleteUserStudyProgressInput!
    $condition: ModelUserStudyProgressConditionInput
  ) {
    deleteUserStudyProgress(input: $input, condition: $condition) {
      id
      owner
      name
      progress
      lastSlideID
      level
      createdAt
      updatedAt
    }
  }
`;
