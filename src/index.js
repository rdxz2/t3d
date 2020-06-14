import 'antd/dist/antd.less'; // uncomment for light theme
// import 'antd/dist/antd.dark.less'; // uncomment for dark theme
import 'react-perfect-scrollbar/dist/css/styles.css';

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// get configuration file
dotenv.config();

ReactDOM.render(<App></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
