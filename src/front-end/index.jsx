import React from 'react';
import createHistory from 'history/createBrowserHistory';
import dva from 'dva';
import routers from './routers';
import Models from './models';

import './styles/reset.css';
import './utils/request-animation-frame-polyfill';
import './styles/animate.scss';

const history = createHistory();
const app = dva({
  history: history,
});

Object.values(Models).forEach(model => app.model(model));

app.router(routers);
app.start('#root');