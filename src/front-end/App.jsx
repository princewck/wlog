import React, { Fragment } from 'react';
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
import './styles/layout.scss';
import { Nav, Footer, ScrollTop } from './components'; 

export const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(asyncFetch, routerMiddleware(history))(createStore);
export const store = createStoreWithMiddleware(
  connectRouter(history)(reducers),  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Base = (props) => {
  return (
    <div style={{padding: '100px 0 180px'}}>
      <Nav />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/posts" component={Home} />
        <Route exact path="/mine/posts" component={MyPosts} />
        <Route path="/post/:id" component={Article} />
        <Route path="/edit/1/:id" component={Edit} />
        <Route path="/edit/2/:id" component={EditMD} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Fragment>
          <Switch location={location} >
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Base}/>
          </Switch>  
          <ScrollTop />
        </Fragment>
      </ConnectedRouter>
    </Provider>
  );
}