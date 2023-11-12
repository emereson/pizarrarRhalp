/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWhiteBoardEvent = /* GraphQL */ `
  query GetWhiteBoardEvent($id: ID!) {
    getWhiteBoardEvent(id: $id) {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const listWhiteBoardEvents = /* GraphQL */ `
  query ListWhiteBoardEvents(
    $filter: ModelWhiteBoardEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWhiteBoardEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        classRoomId
        page
        updatedAt
        payload
        createdAt
      }
      nextToken
    }
  }
`;
export const shapesByClassRoomByPage = /* GraphQL */ `
  query ShapesByClassRoomByPage(
    $classRoomId: ID!
    $pageUpdatedAt: ModelWhiteBoardEventByClassRoomByPageCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWhiteBoardEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    shapesByClassRoomByPage(
      classRoomId: $classRoomId
      pageUpdatedAt: $pageUpdatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classRoomId
        page
        updatedAt
        payload
        createdAt
      }
      nextToken
    }
  }
`;
export const getClassRoom = /* GraphQL */ `
  query GetClassRoom($id: ID!) {
    getClassRoom(id: $id) {
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
export const listClassRooms = /* GraphQL */ `
  query ListClassRooms(
    $id: ID
    $filter: ModelClassRoomFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listClassRooms(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTeacher = /* GraphQL */ `
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $id: ID
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeachers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          profilePicture
          createdAt
          updatedAt
        }
        students {
          nextToken
        }
        callingState
        callingInit
        callingBlock
        callingOneBlock
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $id: ID
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          profilePicture
          createdAt
          updatedAt
        }
        evaluations {
          nextToken
        }
        callingState
        callingInit
        callingBlock
        callingOneBlock
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvaluation = /* GraphQL */ `
  query GetEvaluation($id: ID!) {
    getEvaluation(id: $id) {
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
export const listEvaluations = /* GraphQL */ `
  query ListEvaluations(
    $id: ID
    $filter: ModelEvaluationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvaluations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const evaluationsByStudents = /* GraphQL */ `
  query EvaluationsByStudents(
    $studentId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEvaluationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    evaluationsByStudents(
      studentId: $studentId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $id: ID
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFiles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const filesByUsers = /* GraphQL */ `
  query FilesByUsers(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    filesByUsers(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getLevel = /* GraphQL */ `
  query GetLevel($id: ID!) {
    getLevel(id: $id) {
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
export const listLevels = /* GraphQL */ `
  query ListLevels($filter: ModelLevelFilterInput, $limit: Int, $nextToken: String) {
    listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        studyDocumentSlides {
          nextToken
        }
        orderArray
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudyDocumentSlide = /* GraphQL */ `
  query GetStudyDocumentSlide($id: ID!) {
    getStudyDocumentSlide(id: $id) {
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
export const listStudyDocumentSlides = /* GraphQL */ `
  query ListStudyDocumentSlides(
    $filter: ModelStudyDocumentSlideFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudyDocumentSlides(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        levelId
        studyDocumentElements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const slidesByLevel = /* GraphQL */ `
  query SlidesByLevel(
    $levelId: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStudyDocumentSlideFilterInput
    $limit: Int
    $nextToken: String
  ) {
    slidesByLevel(
      levelId: $levelId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        levelId
        studyDocumentElements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudyDocumentElement = /* GraphQL */ `
  query GetStudyDocumentElement($id: ID!) {
    getStudyDocumentElement(id: $id) {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const listStudyDocumentElements = /* GraphQL */ `
  query ListStudyDocumentElements(
    $id: ID
    $filter: ModelStudyDocumentElementFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudyDocumentElements(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const elementsByPage = /* GraphQL */ `
  query ElementsByPage(
    $pageId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudyDocumentElementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    elementsByPage(
      pageId: $pageId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getExam = /* GraphQL */ `
  query GetExam($id: ID!) {
    getExam(id: $id) {
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
export const listExams = /* GraphQL */ `
  query ListExams(
    $id: ID
    $filter: ModelExamFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExams(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          nextToken
        }
        examColorScheme
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExamSection = /* GraphQL */ `
  query GetExamSection($id: ID!) {
    getExamSection(id: $id) {
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
export const listExamSections = /* GraphQL */ `
  query ListExamSections(
    $id: ID
    $filter: ModelExamSectionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExamSections(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        command
        createdAt
        examId
        questions {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const sectionsByExam = /* GraphQL */ `
  query SectionsByExam(
    $examId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelExamSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sectionsByExam(
      examId: $examId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        command
        createdAt
        examId
        questions {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExamQuestion = /* GraphQL */ `
  query GetExamQuestion($id: ID!) {
    getExamQuestion(id: $id) {
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
export const listExamQuestions = /* GraphQL */ `
  query ListExamQuestions(
    $id: ID
    $filter: ModelExamQuestionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExamQuestions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const questionsByExamSection = /* GraphQL */ `
  query QuestionsByExamSection(
    $examSectionId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelExamQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionsByExamSection(
      examSectionId: $examSectionId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getSlideObjectCoords = /* GraphQL */ `
  query GetSlideObjectCoords($id: ID!) {
    getSlideObjectCoords(id: $id) {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const listSlideObjectCoords = /* GraphQL */ `
  query ListSlideObjectCoords(
    $id: ID
    $filter: ModelSlideObjectCoordsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSlideObjectCoords(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        x
        y
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSlideImage = /* GraphQL */ `
  query GetSlideImage($id: ID!) {
    getSlideImage(id: $id) {
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
export const listSlideImages = /* GraphQL */ `
  query ListSlideImages(
    $id: ID
    $filter: ModelSlideImageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSlideImages(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSlideText = /* GraphQL */ `
  query GetSlideText($id: ID!) {
    getSlideText(id: $id) {
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
export const listSlideTexts = /* GraphQL */ `
  query ListSlideTexts(
    $id: ID
    $filter: ModelSlideTextFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSlideTexts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getLearningContentSlide = /* GraphQL */ `
  query GetLearningContentSlide($id: ID!) {
    getLearningContentSlide(id: $id) {
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
export const listLearningContentSlides = /* GraphQL */ `
  query ListLearningContentSlides(
    $id: ID
    $filter: ModelLearningContentSlideFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLearningContentSlides(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        timestamp
        texts {
          nextToken
        }
        images {
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
      nextToken
    }
  }
`;
export const getStudentsLevels = /* GraphQL */ `
  query GetStudentsLevels($id: ID!) {
    getStudentsLevels(id: $id) {
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
export const listStudentsLevels = /* GraphQL */ `
  query ListStudentsLevels(
    $id: ID
    $filter: ModelStudentsLevelsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudentsLevels(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        content
        slides {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserStudyProgress = /* GraphQL */ `
  query GetUserStudyProgress($id: ID!) {
    getUserStudyProgress(id: $id) {
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
export const listUserStudyProgresses = /* GraphQL */ `
  query ListUserStudyProgresses(
    $id: ID
    $filter: ModelUserStudyProgressFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserStudyProgresses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        owner
        name
        progress
        lastSlideID
        level
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
