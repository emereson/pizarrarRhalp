export const schema = {
  models: {
    User: {
      name: 'User',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        email: {
          name: 'email',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        profilePicture: {
          name: 'profilePicture',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        files: {
          name: 'files',
          isArray: true,
          type: {
            model: 'File'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'userId'
          }
        }
      },
      syncable: true,
      pluralName: 'Users',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    File: {
      name: 'File',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        userId: {
          name: 'userId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        url: {
          name: 'url',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'Files',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byUser',
            fields: ['userId', 'createdAt'],
            queryField: 'filesByUsers'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    ClassRoom: {
      name: 'ClassRoom',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        page: {
          name: 'page',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: []
        },
        backgroundImageUrl: {
          name: 'backgroundImageUrl',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        iconsColor: {
          name: 'iconsColor',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        isDisabled: {
          name: 'isDisabled',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        isCrystalTheme: {
          name: 'isCrystalTheme',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        teachers: {
          name: 'teachers',
          isArray: true,
          type: {
            model: 'Teacher'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'classRoom'
          }
        },
        students: {
          name: 'students',
          isArray: true,
          type: {
            model: 'Student'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'classRoom'
          }
        }
      },
      syncable: true,
      pluralName: 'ClassRooms',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Teacher: {
      name: 'Teacher',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        classRoom: {
          name: 'classRoom',
          isArray: false,
          type: {
            model: 'ClassRoom'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'classRoomId'
          }
        },
        user: {
          name: 'user',
          isArray: false,
          type: {
            model: 'User'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'id'
          }
        },
        students: {
          name: 'students',
          isArray: true,
          type: {
            model: 'Student'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'classRoom'
          }
        }
      },
      syncable: true,
      pluralName: 'Teachers',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'teachersByClassroomId',
            fields: ['classRoomId', 'id']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Student: {
      name: 'Student',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        classRoom: {
          name: 'classRoom',
          isArray: false,
          type: {
            model: 'ClassRoom'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'classRoomId'
          }
        },
        user: {
          name: 'user',
          isArray: false,
          type: {
            model: 'User'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'id'
          }
        },
        evaluations: {
          name: 'evaluations',
          isArray: true,
          type: {
            model: 'Evaluation'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'studentId'
          }
        }
      },
      syncable: true,
      pluralName: 'Students',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'studentsByClassroomId',
            fields: ['classRoomId', 'id']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Evaluation: {
      name: 'Evaluation',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        fileId: {
          name: 'fileId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        studentId: {
          name: 'studentId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        no: {
          name: 'no',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        process: {
          name: 'process',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        score: {
          name: 'score',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: []
        },
        skills: {
          name: 'skills',
          isArray: false,
          type: {
            nonModel: 'Skills'
          },
          isRequired: false,
          attributes: []
        },
        date: {
          name: 'date',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        file: {
          name: 'file',
          isArray: false,
          type: {
            model: 'File'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'HAS_ONE',
            associatedWith: 'id',
            targetName: 'fileId'
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'Evaluations',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byStudent',
            fields: ['studentId', 'createdAt'],
            queryField: 'evaluationsByStudents'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    WhiteBoardEvent: {
      name: 'WhiteBoardEvent',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        classRoomId: {
          name: 'classRoomId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        page: {
          name: 'page',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: []
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        payload: {
          name: 'payload',
          isArray: false,
          type: 'AWSJSON',
          isRequired: true,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'WhiteBoardEvents',
      attributes: [
        {
          type: 'aws_api_key',
          properties: {}
        },
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'ByClassRoomByPage',
            fields: ['classRoomId', 'page', 'updatedAt'],
            queryField: 'shapesByClassRoomByPage'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Level: {
      name: 'Level',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: []
        },
        studyDocumentSlides: {
          name: 'studyDocumentSlides',
          isArray: true,
          type: {
            model: 'StudyDocumentSlide'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'levelId'
          }
        },
        orderArray: {
          name: 'orderArray',
          isArray: false,
          type: 'AWSJSON',
          isRequired: false,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'Levels',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    StudyDocumentSlide: {
      name: 'StudyDocumentSlide',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        levelId: {
          name: 'levelId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        studyDocumentElements: {
          name: 'studyDocumentElements',
          isArray: true,
          type: {
            model: 'StudyDocumentElement'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'pageId'
          }
        }
      },
      syncable: true,
      pluralName: 'StudyDocumentSlides',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'ByLevel',
            fields: ['levelId', 'id'],
            queryField: 'slidesByLevel'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    StudyDocumentElement: {
      name: 'StudyDocumentElement',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        pageId: {
          name: 'pageId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        type: {
          name: 'type',
          isArray: false,
          type: {
            enum: 'ElementType'
          },
          isRequired: false,
          attributes: []
        },
        value: {
          name: 'value',
          isArray: false,
          type: 'AWSJSON',
          isRequired: true,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'StudyDocumentElements',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'ByPage',
            fields: ['pageId'],
            queryField: 'elementsByPage'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    EnglishTest: {
      name: 'EnglishTest',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        minScore: {
          name: 'minScore',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: []
        },
        maxSCore: {
          name: 'maxSCore',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: []
        },
        scoreFeedback: {
          name: 'scoreFeedback',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        correctAnswers: {
          name: 'correctAnswers',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        correctAnswersFeedback: {
          name: 'correctAnswersFeedback',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        inCorrectAnswers: {
          name: 'inCorrectAnswers',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        inCorrectAnswersFeedback: {
          name: 'inCorrectAnswersFeedback',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        selectedEvaluations: {
          name: 'selectedEvaluations',
          isArray: true,
          type: 'String',
          isRequired: false,
          attributes: [],
          isArrayNullable: true
        },
        questions: {
          name: 'questions',
          isArray: true,
          type: {
            model: 'EnglishTestQuestion'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'englishTestId'
          }
        }
      },
      syncable: true,
      pluralName: 'EnglishTests',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    EnglishTestQuestion: {
      name: 'EnglishTestQuestion',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        englishTestId: {
          name: 'englishTestId',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        statement: {
          name: 'statement',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        optionA: {
          name: 'optionA',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        optionB: {
          name: 'optionB',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        optionC: {
          name: 'optionC',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        optionD: {
          name: 'optionD',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        correctOptions: {
          name: 'correctOptions',
          isArray: true,
          type: 'String',
          isRequired: true,
          attributes: [],
          isArrayNullable: true
        },
        image: {
          name: 'image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        audio: {
          name: 'audio',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        needsRecording: {
          name: 'needsRecording',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        }
      },
      syncable: true,
      pluralName: 'EnglishTestQuestions',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            fields: ['id']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'questionsByEnglishTest',
            fields: ['englishTestId', 'createdAt'],
            queryField: 'questionsByEnglishTest'
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    }
  },
  enums: {
    ElementType: {
      name: 'ElementType',
      values: ['IMAGE', 'TEXT']
    }
  },
  nonModels: {
    Skills: {
      name: 'Skills',
      fields: {
        listenning: {
          name: 'listenning',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: []
        },
        speaking: {
          name: 'speaking',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: []
        },
        writting: {
          name: 'writting',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: []
        },
        reading: {
          name: 'reading',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: []
        }
      }
    }
  },
  version: '49e96e7146eeda899affaf3b1b2de3f4'
};
