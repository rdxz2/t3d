import 'antd/dist/antd.less';
import 'react-perfect-scrollbar/dist/css/styles.css';

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// get configuration file
dotenv.config();

// render the rest of application in root element
ReactDOM.render(<App></App>, document.getElementById('root'));

// use service worker
serviceWorker.register();
