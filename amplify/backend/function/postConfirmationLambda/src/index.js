/* Amplify Params - DO NOT EDIT
	API_BRANAKGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_BRANAKGRAPHQL_STUDENTTABLE_ARN
	API_BRANAKGRAPHQL_STUDENTTABLE_NAME
	API_BRANAKGRAPHQL_TEACHERTABLE_ARN
	API_BRANAKGRAPHQL_TEACHERTABLE_NAME
	API_BRANAKGRAPHQL_USERTABLE_ARN
	API_BRANAKGRAPHQL_USERTABLE_NAME
	AUTH_BRANAKAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
	API_BRANAKGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_BRANAKGRAPHQL_STUDENTTABLE_ARN
	API_BRANAKGRAPHQL_STUDENTTABLE_NAME
	API_BRANAKGRAPHQL_TEACHERTABLE_ARN
	API_BRANAKGRAPHQL_TEACHERTABLE_NAME
	API_BRANAKGRAPHQL_USERTABLE_ARN
	API_BRANAKGRAPHQL_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
	API_BRANAKGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_BRANAKGRAPHQL_STUDENTTABLE_ARN
	API_BRANAKGRAPHQL_STUDENTTABLE_NAME
	API_BRANAKGRAPHQL_USERTABLE_ARN
	API_BRANAKGRAPHQL_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');

const CognitoIDP = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
const ddb = new aws.DynamoDB();
const CLASSROOM_NOT_ASSIGNED = 'CLASSROOM_NOT_ASSIGNED';
const adminEmails = ['ralphman1@hotmail.com', 'ajvargass@correo.udistrital.edu.co', 'andresj172020@gmail.com'];

exports.handler = async (event, context, callback) => {
  if (event.request.userAttributes.sub) {
    const isTeacher = JSON.parse(event.request.clientMetadata.isTeacher);
    const isAdmin = adminEmails.includes(event.request.userAttributes.email);
    try {
      if (isAdmin) {
        await Promise.all([
          registerUser(event),
          addUserToGroup(event.userName, 'administrators')
        ]);
      } else {
        await Promise.all([
          registerUser(event),
          isTeacher ? registerTeacher(event) : registerStudent(event),
          isTeacher
            ? addUserToGroup(event.userName, 'teachers')
            : addUserToGroup(event.userName, 'students')
        ]);
      }
      console.log('postConfirmationLambda executed successfully');
      callback(null, event);
    } catch (error) {
      console.error('error executing postConfirmationLambda');
      callback(null, event);
    }
  } else {
    callback(null, event);
  }
};

const addUserToGroup = async (username, groupName) => {
  try {
    const params = {
      GroupName: groupName,
      UserPoolId: process.env.AUTH_BRANAKAUTH_USERPOOLID,
      Username: username
    };
    const result = await CognitoIDP.adminAddUserToGroup(params).promise();
    console.log(`user ${username} added to group ${groupName}`);
    return result;
  } catch (err) {
    const errorMessage = `Error adding user ${username} to group ${groupName}`;
    console.log(errorMessage, err);
    throw new Error(errorMessage);
  }
};

const registerStudent = async event => {
  let date = new Date();
  const studentTable = process.env.API_BRANAKGRAPHQL_STUDENTTABLE_NAME;
  let params = {
    Item: {
      id: { S: event.request.userAttributes.sub },
      __typename: { S: 'Student' },
      classRoomId: { S: CLASSROOM_NOT_ASSIGNED },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() }
    },
    TableName: studentTable
  };
  try {
    await ddb.putItem(params).promise();
    console.log(`student ${event.request.userAttributes.email} registered to Dynamo`);
  } catch (err) {
    const errorMessage = `Error registering student ${event.request.userAttributes.email}`;
    console.log(errorMessage, err);
    throw new Error(errorMessage);
  }
};

const registerTeacher = async event => {
  let date = new Date();
  const studentTable = process.env.API_BRANAKGRAPHQL_TEACHERTABLE_NAME;
  let params = {
    Item: {
      id: { S: event.request.userAttributes.sub },
      __typename: { S: 'Teacher' },
      classRoomId: { S: CLASSROOM_NOT_ASSIGNED },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() }
    },
    TableName: studentTable
  };
  try {
    await ddb.putItem(params).promise();
    console.log(`teacher ${event.request.userAttributes.email} registered to Dynamo`);
  } catch (err) {
    const errorMessage = `Error registering teacher ${event.request.userAttributes.email}`;
    console.log(errorMessage, err);
    throw new Error(errorMessage);
  }
};

const registerUser = async event => {
  let date = new Date();
  const userTable = process.env.API_BRANAKGRAPHQL_USERTABLE_NAME;
  let params = {
    Item: {
      id: { S: event.request.userAttributes.sub },
      __typename: { S: 'User' },
      name: { S: event.request.userAttributes.name },
      email: { S: event.request.userAttributes.email },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() }
    },
    TableName: userTable
  };
  try {
    await ddb.putItem(params).promise();
    console.log(`user ${event.request.userAttributes.email} registered to Dynamo`);
  } catch (err) {
    const errorMessage = `Error registering user ${event.request.userAttributes.email}`;
    console.log(errorMessage, err);
    throw new Error(errorMessage);
  }
};
