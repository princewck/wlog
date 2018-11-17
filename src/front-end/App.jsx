import React, { Component } from 'react';
import {
  Home,
  Article,
  Edit,
  EditMD,
  MyPosts,
} from './pages';
import { Route, Switch } from 'dva/router';
import { Nav, Footer, ScrollTop } from './components'; 

const routes = [
  {
    path: '/',
    component: Home,
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

export default class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Switch>
        {
         routes.map(route => (
           <Route path={route.path} exact={route.exact} component={route.component} />
         )) 
        }
        </Switch>
        <Footer />
      </div>
    );
  }

}