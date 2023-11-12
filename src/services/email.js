import API from '@aws-amplify/api';

const API_NAME = 'BranakApiGateway';

export async function sendEmail(body) {
  const path = '/email';
  const params = {
    body,
    headers: {}
  };
  try {
    await API.post(API_NAME, path, params);
  } catch (error) {
    console.error('error sending email');
    console.error(error);
    throw error;
  }
}
