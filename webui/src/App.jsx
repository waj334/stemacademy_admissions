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
import LoginView from './views/LoginView.jsx';
import AdminMain from './views/AdminMain.jsx';
import SignupView from './views/SignupView.jsx';
import FrontPageView from './views/FrontPageView.jsx';

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
          <Route path='/admin/login' history={history} component={LoginView} />
          <Route path ='/admin/main'  render={() =><AuthComponent view={AdminMain} /> } />
          <Route path='/app/student' history={history} render={() =><AuthComponent accessLevel={0} view={StudentApplication} /> } />
          <Route path='/app/teacher' component={TeacherApplication} />
          <Route path='/signup' component={SignupView} />
          <Route path='/' component={FrontPageView} />
        </Switch>
      </Router>
    </Provider>
    );
  }
}

export default App;
