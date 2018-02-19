import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Test from './components/Test';
import Home from './pages/Home';
import Article from './pages/Article';
import Edit from './pages/Edit';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import asyncFetch from './middlewares/asyncFetch';
import 'animate.css';

const createStoreWithMiddleware = applyMiddleware(asyncFetch)(createStore);
const store = createStoreWithMiddleware(reducers);

export default ({ props }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/post/:id" component={Article}></Route>
          <Route path="/edit/:id" component={Edit}></Route>
        </div>
      </Router>
    </Provider>
  );
}