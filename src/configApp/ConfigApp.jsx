import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/configStore';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from '../App';
import UserProvider from '../components/UserManagment/UserProvider';
import SocketProvider from '../providers/SocketProvider';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { cache } from '../ApolloCache';
import { ApolloLink } from 'apollo-link';
import { AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import Auth from '@aws-amplify/auth';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import appSyncConfig from '../aws-exports';
import { getUserIdToken } from '../services/cognito.service';
import { ColorSchemeProvider } from 'components/Exam/hooks/useColorScheme';
import { ThemeProvider } from '@material-ui/core';
import { DefaultTheme } from './materialTheme';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;

const auth = {
  type: appSyncConfig.aws_appsync_authenticationType,
  jwtToken: getUserIdToken
};

const iamAuth = {
  type: AUTH_TYPE.AWS_IAM,
  credentials: () => Auth.currentCredentials()
};

const cognitoLink = createAuthLink({
  url,
  region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    jwtToken: getUserIdToken
  }
});

const iamAuthLink = createAuthLink({
  url,
  region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials()
  }
});

const apiAuthLink = createAuthLink({
  url,
  region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: appSyncConfig.aws_appsync_apiKey
  }
});

const publicOperations = ['getExam'];

// decide which the proper link from above to use (directional link)
const awsLink = ApolloLink.split(
  operation => {
    // use your own conditions here to decide which link to use. e.g. Auth.currentSession()
    return publicOperations.includes(operation.operationName);
  },
  apiAuthLink,
  cognitoLink
);

// TODO
// check https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/
// check https://aws.amazon.com/es/blogs/mobile/using-multiple-authorization-types-with-aws-appsync-graphql-apis/#:~:text=In%20order%20to%20use%20multiple,Vue
// for creating multiple links and using context to diferentiate

const link = ApolloLink.from([
  //createAuthLink({ url, region, auth }),
  //({ url, region, auth: iamAuth }),
  awsLink,
  createSubscriptionHandshakeLink({ url, region, auth })
]);

const apolloClient = new ApolloClient({
  link,
  cache
});

const ConfigApp = () => {
  return (
    <Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <ApolloProvider client={apolloClient}>
        <Router>
          <CookiesProvider>
            <UserProvider>
              <SocketProvider>
                <ColorSchemeProvider>
                  <Provider store={store}>
                    <ThemeProvider theme={DefaultTheme}>
                      <App />
                    </ThemeProvider>
                  </Provider>
                </ColorSchemeProvider>
              </SocketProvider>
            </UserProvider>
          </CookiesProvider>
        </Router>
      </ApolloProvider>
    </Fragment>
  );
};

export default ConfigApp;
