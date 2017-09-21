import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, Switch } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory';

import logo from './logo.svg';
import './App.css'; 

import MainPage from './MainPage.jsx';
import StudentApplication from './StudentApplication.jsx';

const Layout = () => (
  <main>
    <Switch>
      <Route path='/app/student' component={StudentApplication} />
      <Route path='/' component={MainPage} />
    </Switch>
  </main>
);

const history = createHashHistory();

const App = () =>
  <Router history={history}>
    <Layout />
  </Router>;

export default App;
