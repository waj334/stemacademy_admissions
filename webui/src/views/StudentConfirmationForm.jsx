import React, { Component } from 'react';
import {Form, Header} from 'semantic-ui-react';

import * as Constants from '../Constants';

import ApplicationForm from '../components/ApplicationForm.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';

class StudentConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    form() {
        return (
        <div>
            <Header dividing>Personal Information</Header>
            <PersonalInfoForm id={0} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            <Header dividing>Parent/Guardian Contact Information</Header>
            <ContactInfoForm id={1} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            <Header dividing>High School Information</Header>
            <HighSchoolInfoForm id={2} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
        </div>
    )}
}

export default StudentConfirmationForm;