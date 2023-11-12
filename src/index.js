// polyfills
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ConfigApp from './configApp/ConfigApp';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import reportWebVitals from './reportWebVitals';

// ASSETS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/scss/index.scss';

//Configure AWS Amplify
Amplify.configure(awsExports);

// Performance checks
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, {
  //   trackAllPureComponents: true,
  // });
}

ReactDOM.render(<ConfigApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
