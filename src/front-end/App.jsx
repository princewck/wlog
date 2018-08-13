import React from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Test from './components/Test';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router'
import {
  Home,
  Article,
  Edit,
  Login,
  EditMD,
  MyPosts,
} from './pages';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import asyncFetch from './middlewares/asyncFetch';
import 'animate.css';
import './assets/styles/layout.scss';

export const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(asyncFetch, routerMiddleware(history))(createStore);
export const store = createStoreWithMiddleware(
  connectRouter(history)(reducers),  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch location={location} >
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/mine/posts" component={MyPosts} />
          <Route exact path="/login" component={Login} />
          <Route path="/post/:id" component={Article} />
          <Route path="/edit/1/:id" component={Edit} />
          <Route path="/edit/2/:id" component={EditMD} />
          <Redirect to="/" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}