import React, { Component } from 'react';
import Container, { Form, Header, Message } from 'semantic-ui-react';

import * as Constants from '../Constants';

import ApplicationForm from '../components/ApplicationForm.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import DocumentForm from './DocumentForm.jsx';

class StudentConfirmationForm extends ApplicationForm {
    constructor(props) {
        super(props);
    }

    form() {
        return (
        <div>
            <Message info>
                Click above to return to any previous section.
            </Message>
            <Header dividing>Personal Information</Header>
            <PersonalInfoForm id={0} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            <Header dividing>Parent/Guardian Contact Information</Header>
            <ContactInfoForm id={1} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            <Header dividing>High School Information</Header>
            <HighSchoolInfoForm id={2} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
            <Header dividing>Transcript</Header>
            <DocumentForm id={3} data={this.props.data} count={this.props.count} disableButton readOnly={true} />
        </div>
    )}
}

export default StudentConfirmationForm;