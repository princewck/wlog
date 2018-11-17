import { Login } from './pages';
import App from './app';
import { Router, Route, Switch } from 'dva/router';
import React from 'react';

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: App,
  }
];

export default ({history, app}) => {
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(route => (
          <Route 
            path={route.path} 
            exact={route.exact} 
            component={route.component}
          />))
        }
      </Switch>
    </Router>
  );
}

