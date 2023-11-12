/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUserUpdated = /* GraphQL */ `
  subscription OnUserUpdated($id: ID!) {
    onUserUpdated(id: $id) {
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
export const onClassRoomUpdated = /* GraphQL */ `
  subscription OnClassRoomUpdated($id: ID!) {
    onClassRoomUpdated(id: $id) {
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
export const onTeacherUpdated = /* GraphQL */ `
  subscription OnTeacherUpdated($id: ID!) {
    onTeacherUpdated(id: $id) {
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
export const onStudentUpdated = /* GraphQL */ `
  subscription OnStudentUpdated($id: ID!) {
    onStudentUpdated(id: $id) {
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
export const onCreateWhiteBoardEvent = /* GraphQL */ `
  subscription OnCreateWhiteBoardEvent {
    onCreateWhiteBoardEvent {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const onUpdateWhiteBoardEvent = /* GraphQL */ `
  subscription OnUpdateWhiteBoardEvent {
    onUpdateWhiteBoardEvent {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const onDeleteWhiteBoardEvent = /* GraphQL */ `
  subscription OnDeleteWhiteBoardEvent {
    onDeleteWhiteBoardEvent {
      id
      classRoomId
      page
      updatedAt
      payload
      createdAt
    }
  }
`;
export const onCreateClassRoom = /* GraphQL */ `
  subscription OnCreateClassRoom {
    onCreateClassRoom {
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
export const onUpdateClassRoom = /* GraphQL */ `
  subscription OnUpdateClassRoom {
    onUpdateClassRoom {
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
export const onDeleteClassRoom = /* GraphQL */ `
  subscription OnDeleteClassRoom {
    onDeleteClassRoom {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher {
    onCreateTeacher {
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
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher {
    onUpdateTeacher {
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
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher {
    onDeleteTeacher {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
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
export const onCreateEvaluation = /* GraphQL */ `
  subscription OnCreateEvaluation {
    onCreateEvaluation {
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
export const onUpdateEvaluation = /* GraphQL */ `
  subscription OnUpdateEvaluation {
    onUpdateEvaluation {
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
export const onDeleteEvaluation = /* GraphQL */ `
  subscription OnDeleteEvaluation {
    onDeleteEvaluation {
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
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
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
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
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
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
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
export const onCreateLevel = /* GraphQL */ `
  subscription OnCreateLevel {
    onCreateLevel {
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
export const onUpdateLevel = /* GraphQL */ `
  subscription OnUpdateLevel {
    onUpdateLevel {
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
export const onDeleteLevel = /* GraphQL */ `
  subscription OnDeleteLevel {
    onDeleteLevel {
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
export const onCreateStudyDocumentSlide = /* GraphQL */ `
  subscription OnCreateStudyDocumentSlide {
    onCreateStudyDocumentSlide {
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
export const onUpdateStudyDocumentSlide = /* GraphQL */ `
  subscription OnUpdateStudyDocumentSlide {
    onUpdateStudyDocumentSlide {
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
export const onDeleteStudyDocumentSlide = /* GraphQL */ `
  subscription OnDeleteStudyDocumentSlide {
    onDeleteStudyDocumentSlide {
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
export const onCreateStudyDocumentElement = /* GraphQL */ `
  subscription OnCreateStudyDocumentElement {
    onCreateStudyDocumentElement {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStudyDocumentElement = /* GraphQL */ `
  subscription OnUpdateStudyDocumentElement {
    onUpdateStudyDocumentElement {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStudyDocumentElement = /* GraphQL */ `
  subscription OnDeleteStudyDocumentElement {
    onDeleteStudyDocumentElement {
      id
      pageId
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const onCreateExam = /* GraphQL */ `
  subscription OnCreateExam {
    onCreateExam {
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
export const onUpdateExam = /* GraphQL */ `
  subscription OnUpdateExam {
    onUpdateExam {
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
export const onDeleteExam = /* GraphQL */ `
  subscription OnDeleteExam {
    onDeleteExam {
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
export const onCreateExamSection = /* GraphQL */ `
  subscription OnCreateExamSection {
    onCreateExamSection {
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
export const onUpdateExamSection = /* GraphQL */ `
  subscription OnUpdateExamSection {
    onUpdateExamSection {
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
export const onDeleteExamSection = /* GraphQL */ `
  subscription OnDeleteExamSection {
    onDeleteExamSection {
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
export const onCreateExamQuestion = /* GraphQL */ `
  subscription OnCreateExamQuestion {
    onCreateExamQuestion {
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
export const onUpdateExamQuestion = /* GraphQL */ `
  subscription OnUpdateExamQuestion {
    onUpdateExamQuestion {
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
export const onDeleteExamQuestion = /* GraphQL */ `
  subscription OnDeleteExamQuestion {
    onDeleteExamQuestion {
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
export const onCreateSlideObjectCoords = /* GraphQL */ `
  subscription OnCreateSlideObjectCoords {
    onCreateSlideObjectCoords {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSlideObjectCoords = /* GraphQL */ `
  subscription OnUpdateSlideObjectCoords {
    onUpdateSlideObjectCoords {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSlideObjectCoords = /* GraphQL */ `
  subscription OnDeleteSlideObjectCoords {
    onDeleteSlideObjectCoords {
      id
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSlideImage = /* GraphQL */ `
  subscription OnCreateSlideImage {
    onCreateSlideImage {
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
export const onUpdateSlideImage = /* GraphQL */ `
  subscription OnUpdateSlideImage {
    onUpdateSlideImage {
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
export const onDeleteSlideImage = /* GraphQL */ `
  subscription OnDeleteSlideImage {
    onDeleteSlideImage {
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
export const onCreateSlideText = /* GraphQL */ `
  subscription OnCreateSlideText {
    onCreateSlideText {
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
export const onUpdateSlideText = /* GraphQL */ `
  subscription OnUpdateSlideText {
    onUpdateSlideText {
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
export const onDeleteSlideText = /* GraphQL */ `
  subscription OnDeleteSlideText {
    onDeleteSlideText {
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
export const onCreateLearningContentSlide = /* GraphQL */ `
  subscription OnCreateLearningContentSlide {
    onCreateLearningContentSlide {
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
export const onUpdateLearningContentSlide = /* GraphQL */ `
  subscription OnUpdateLearningContentSlide {
    onUpdateLearningContentSlide {
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
export const onDeleteLearningContentSlide = /* GraphQL */ `
  subscription OnDeleteLearningContentSlide {
    onDeleteLearningContentSlide {
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
export const onCreateStudentsLevels = /* GraphQL */ `
  subscription OnCreateStudentsLevels {
    onCreateStudentsLevels {
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
export const onUpdateStudentsLevels = /* GraphQL */ `
  subscription OnUpdateStudentsLevels {
    onUpdateStudentsLevels {
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
export const onDeleteStudentsLevels = /* GraphQL */ `
  subscription OnDeleteStudentsLevels {
    onDeleteStudentsLevels {
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
export const onCreateUserStudyProgress = /* GraphQL */ `
  subscription OnCreateUserStudyProgress {
    onCreateUserStudyProgress {
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
export const onUpdateUserStudyProgress = /* GraphQL */ `
  subscription OnUpdateUserStudyProgress {
    onUpdateUserStudyProgress {
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
export const onDeleteUserStudyProgress = /* GraphQL */ `
  subscription OnDeleteUserStudyProgress {
    onDeleteUserStudyProgress {
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
