import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, Switch } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import logo from './logo.svg';
import './App.css'; 

//Views
import MainPage from './views/MainPage.jsx';
import StudentApplication from './views/StudentApplication.jsx';
import TeacherApplication from './views/TeacherApplication.jsx';
import LoginPage from './views/LoginPage.jsx';
import AdminMain from './views/AdminMain.jsx';
import SignupView from './views/SignupView.jsx';

import AuthComponent from './components/AuthComponent.jsx';

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
          <Route path='/admin/login' history={history} render={LoginPage} />
          <Route path ='/admin/main' component={AdminMain} />
          <Route path='/app/student' component={StudentApplication} />
          <Route path='/app/teacher' component={TeacherApplication} />
          <Route path='/signup' component={SignupView} />
          <Route path='/' component={MainPage} />
        </Switch>
      </Router>
    </Provider>
    );
  }
}

export default App;
