import React, { Component } from 'react';
import {Form, Header} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import SubjectForm from './SubjectForm.jsx';

class TeacherConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        //API call to process application data
        console.log(this.props.data);

        //Move to completion page
        this.props.onNext();
    }

    buildSubject(data, i) {
        return <Form.Input value={data} readOnly />
    }

    form() {
        return (
            <div>
                <Header dividing>Your Personal Information</Header>
                <PersonalInfoForm id={0} data={this.props.data} disableButton readOnly={true} />
                <Header dividing>Emergency Contact</Header>
                <ContactInfoForm id={1} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
                <Header dividing>High School Information</Header>
                <HighSchoolInfoForm id={2} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
                <Header dividing>Subjects Taught</Header>
                <SubjectForm id={3} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            </div>
        )
    }
}

export default TeacherConfirmationForm;