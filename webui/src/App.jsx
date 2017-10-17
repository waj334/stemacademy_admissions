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

import reducers from './reducers';

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk))(createStore);
const store = createStoreWithMiddleware(reducers);
const history = createHashHistory();

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/admin/login' component={LoginPage} />
          <Route path ='/admin/main' component={AdminMain} />
          <Route path='/app/student' component={StudentApplication} />
          <Route path='/app/teacher' component={TeacherApplication} />
          <Route path='/' component={MainPage} />
        </Switch>
      </Router>
    </Provider>
    );
  }
}

export default App;
