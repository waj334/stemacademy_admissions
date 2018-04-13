import React, { Component } from 'react';
import Application from '../components/Application.jsx';

import FormStepGroup from '../components/FormStepGroup.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import StudentConfirmationForm from './StudentConfirmationForm.jsx';
import ApplicationSubmittedPage from './ApplicationSubmittedPage.jsx';
import DocumentForm from './DocumentForm.jsx';

const forms = [
    {key: 0, icon:'user', title:'Personal Information', desc:'Please provide for us a few details about yourself.', page:PersonalInfoForm},
    {key: 1, icon:'info', title:'Parent/Guardian Contact Information', desc:'Please provide your parent/guardian information.', page:ContactInfoForm},
    {key: 2, icon:'university', title:'High School Information', desc:'Where do you attend school?', page:HighSchoolInfoForm},
    {key: 3, icon:'upload', title:'Upload Transcript', desc:'Please upload a copy of your most recent transcript.', page:DocumentForm},
    {key: 4, icon:'help', title:'Confirm', desc:'Is this correct?', page:StudentConfirmationForm},
    {key: 5, icon:'checked calendar', title:'Submitted', desc:'Your application has been submitted', page:ApplicationSubmittedPage},
];

var data = {
    age: '',
    gender: '',
    ethnicity: '',
    citizenship: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    contact_fname: '',
    contact_lname: '',
    contact_phone_no: '',
    contact_email: '',
    school_name: '',
    school_county: '',
    school_phone_no: '',
    school_street: '',
    school_city: '',
    school_state: '',
    school_zip: '',
    files: []
};

const StudentApplication = () => (
    <Application header='Application for Students' data={data} forms={forms} type='student' />
);

export default StudentApplication;