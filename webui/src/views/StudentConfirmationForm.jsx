import React, { Component } from 'react';
import {Form, Header} from 'semantic-ui-react';

import * as Constants from '../Constants';

import ApplicationForm from '../components/ApplicationForm.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ParentInfoForm from './ParentInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';

class StudentConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Header dividing>Personal Information</Header>
            <PersonalInfoForm id={0} data={this.props.data} readOnly={true} />
            <Header dividing>Parent/Guardian Contact Information</Header>
            <ParentInfoForm id={1} data={this.props.data} readOnly={true} />
            <Header dividing>High School Information</Header>
            <HighSchoolInfoForm id={2} data={this.props.data} readOnly={true} />
        </div>
    )}
}

export default StudentConfirmationForm;