import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './assets/styles/reset.css';
import './utils/request-animation-frame-polyfill';
import './assets/styles/animate.scss';

ReactDOM.render(<App />, document.querySelector('#root'));