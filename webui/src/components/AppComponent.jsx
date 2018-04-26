import React, { Component } from 'react';

import StudentApplication from '../views/StudentApplication.jsx';
import TeacherApplication from '../views/TeacherApplication.jsx';

import * as Constants from '../Constants';

export default class AppComponent extends Component {
    render() {
        switch (localStorage.getItem('account-type')) {
            case '0':
                return <StudentApplication {...this.props} history={history} />
            case '1':
                return <TeacherApplication {...this.props} history={history} />
            default:
                return <div />
        }
    }
}