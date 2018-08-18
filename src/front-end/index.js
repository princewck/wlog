import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/reset.css';
import './utils/request-animation-frame-polyfill';
import './styles/animate.scss';

ReactDOM.render(<App />, document.querySelector('#root'));