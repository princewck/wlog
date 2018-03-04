import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Test from './components/Test';
import Home from './pages/Home';
import Article from './pages/Article';
import Edit from './pages/Edit';
import Login from './pages/Auth/Login';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import asyncFetch from './middlewares/asyncFetch';
import 'animate.css';

const createStoreWithMiddleware = applyMiddleware(asyncFetch)(createStore);
const store = createStoreWithMiddleware(reducers);

export default (props) => {
  return (
    <Provider store={store}>
      <Router>
        <Route
          render={
            ({ location }) => {
              return (
                <Switch location={location} >
                  <Route exact path="/" component={Login} />
                  <Route exact path="/posts" component={Home} />
                  <Route path="/post/:id" component={Article} />
                  <Route path="/edit/:id" component={Edit} />
                  <Redirect to="/" />
                </Switch>
              );
            }
          }
        />
      </Router>
    </Provider>
  );
}