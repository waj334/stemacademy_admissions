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
import AppComponent from './components/AppComponent.jsx';
import LoginView from './views/LoginView.jsx';
import AdminMain from './views/AdminMain.jsx';
import SignupView from './views/SignupView.jsx';
import FrontPageView from './views/FrontPageView.jsx';
import EmailVerificationView from './views/EmailVerificationView.jsx';

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
          <Route path ='/admin/main'  render={() =><AuthComponent view={AdminMain} /> } />
          <Route path='/app' history={history} render={() =><AuthComponent accessLevel={0} view={AppComponent} /> } />
          <Route path='/signup' component={SignupView} />
          <Route path='/email/verification/:token'component={EmailVerificationView} />
          <Route path='/' component={FrontPageView} />
        </Switch>
      </Router>
    </Provider>
    );
  }
}

export default App;
