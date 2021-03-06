import React, { Component } from 'react';
import {Form, Header, Message} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import SubjectForm from './SubjectForm.jsx';
import DocumentForm from './DocumentForm.jsx';

class TeacherConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    buildSubject(data, i) {
        return <Form.Input value={data} readOnly />
    }

    form() {
        return (
            <div>
                <Message info hidden={this.props.disableMessage}>
                    Click above to return to any previous section.
                </Message>
                <Header dividing>Personal Information</Header>
                <PersonalInfoForm id={0} data={this.props.data} disableButton readOnly={true} />
                <Header dividing>Emergency Contact</Header>
                <ContactInfoForm id={1} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
                <Header dividing>High School Information</Header>
                <HighSchoolInfoForm id={2} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
                <Header dividing>Subjects Taught</Header>
                <SubjectForm id={3} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
                <Header dividing>Transcript</Header>
                <DocumentForm id={3} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            </div>
        )
    }
}

export default TeacherConfirmationForm;