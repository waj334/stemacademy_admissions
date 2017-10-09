import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, Switch } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import logo from './logo.svg';
import './App.css'; 

import MainPage from './MainPage.jsx';
import StudentApplication from './studentapp/StudentApplication.jsx';
import TeacherApplication from './teacherapp/TeacherApplication.jsx';

import AuthComponent from './auth/AuthComponent.jsx';

import LoginPage from './adminui/LoginPage.jsx';
import AdminMain from './adminui/AdminMain.jsx';

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk))(createStore);
const store = createStoreWithMiddleware(reducers);
const Layout = () => (
  <main>
    <Switch>
      <Route path='/admin/login' component={LoginPage} />
      <Route path ='/admin/main' component={AuthComponent(AdminMain)} />
      <Route path='/app/student' component={StudentApplication} />
      <Route path='/app/teacher' component={TeacherApplication} />
      <Route path='/' component={MainPage} />
    </Switch>
  </main>
);

const history = createHashHistory();

const App = () =>
  <Provider store={store}>
    <Router history={history}>
      <Layout />
    </Router>;
  </Provider>

export default App;
