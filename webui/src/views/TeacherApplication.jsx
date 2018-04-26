import React, { Component } from 'react';
import Application from '../components/Application.jsx';

import PersonalInfoForm from './PersonalInfoForm.jsx';
import ContactInfoForm from './ContactInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import SubjectForm from './SubjectForm.jsx';
import TeacherConfirmationForm from './TeacherConfirmationForm.jsx';
import ApplicationSubmittedPage from './ApplicationSubmittedPage.jsx';
import DocumentForm from './DocumentForm.jsx';

const forms = [
    {key: 0, icon:'user', title:'Personal Information', desc:'Please provide for us a few details about yourself.', page:PersonalInfoForm},
    {key: 1, icon:'emergency', title:'Emergency Contact', desc:'Please provide a secondary emergency purposes.', page:ContactInfoForm},
    {key: 2, icon:'university', title:'High School Information', desc:'Where do you currently teach?', page:HighSchoolInfoForm},
    {key: 3, icon: 'book', title:'Subjects', desc:'What subjects have you taught in the last 2 years?', page:SubjectForm},
    {key: 4, icon: 'upload', title:'Lesson Plans', desc:'Please upload lesson plans from the last 2 years.', page:DocumentForm},
    {key: 5, icon:'help', title:'Confirm', desc:'Is this correct?', page:TeacherConfirmationForm},
    {key: 6, icon:'checked calendar', title:'Submitted', desc:'Your application has been submitted', page:ApplicationSubmittedPage},
];

var data = {
    dob: undefined,
    gender: -1,
    ethnicity: -1,
    citizenship: -1,
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
    subjects: '',
    files: []
}

const TeacherApplication = () => (
    <Application
        header='Application for Teachers' 
        data={data}
        forms={forms}
        type='teacher'
    />
)

export default TeacherApplication;