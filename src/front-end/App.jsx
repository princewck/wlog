import React, { Component } from 'react';
import {
  Home,
  Article,
  Edit,
  EditMD,
  MyPosts,
} from './pages';
import { Route, Switch, withRouter } from 'dva/router';
import { Nav, Footer, ScrollTop } from './components'; 

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/mine/posts',
    component: MyPosts,
  },
  {
    path: '/posts',
    component: Home,
  },
  {
    path: '/post/:id',
    component: Article,
  },
  {
    path: '/edit/1/:id',
    component: Edit,
  },
  {
    path: '/edit/2/:id',
    component: EditMD,
  }
];

@withRouter
export default class App extends Component {

  render() {
    return (
      <div style={{padding: '100px 0 180px'}}>
        <Nav />
        <Switch>
        {
         routes.map((route, index) => (
           <Route path={route.path} exact={route.exact} component={route.component} key={index} />
         )) 
        }
        </Switch>
        <Footer />
      </div>
    );
  }

}