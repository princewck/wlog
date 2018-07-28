import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Test from './components/Test';
import {
  Home,
  Article,
  Edit,
  Login,
  EditMD,
  MyPosts,
} from './pages';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import asyncFetch from './middlewares/asyncFetch';
import 'animate.css';

const createStoreWithMiddleware = applyMiddleware(asyncFetch)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default (props) => {
  return (
    <Provider store={store}>
      <Router> 
        <Route
          render={
            ({ location }) => {
              return (
                <Switch location={location} >
                  <Route exact path="/" component={Home} />
                  <Route exact path="/posts" component={Home} />
                  <Route exact path="/mine/posts" component={MyPosts}/>
                  <Route exact path="/login" component={Login} />
                  <Route path="/post/:id" component={Article} />
                  <Route path="/edit/1/:id" component={Edit} />
                  <Route path="/edit/2/:id" component={EditMD} />
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