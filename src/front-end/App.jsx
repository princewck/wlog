import React from 'react';
import {          Route, BrowserRouter as Router } from 'react-router-dom';
import Test from './components/Test';
import Home from './pages/Home';
import Article from './pages/Article';
import Edit from './pages/Edit';



export default ({props}) => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home}></Route>
        <Route path="/post/:id" component={Article}></Route>
        <Route path="/edit/:id" component={Edit}></Route>
      </div>
    </Router>
  );
}