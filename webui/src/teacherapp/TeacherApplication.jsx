import React, { Component } from 'react';
import Application from '../Application.jsx';

import PersonalInfoForm from '../common/PersonalInfoForm.jsx';
import EmergencyInfoForm from './EmergencyInfoForm.jsx';
import HighSchoolInfoForm from '../common/HighSchoolInfoForm.jsx';
import SubjectForm from './SubjectForm.jsx';
import TeacherConfirmationForm from './TeacherConfirmationForm.jsx';
import ApplicationSubmittedPage from '../common/ApplicationSubmittedPage.jsx';

const forms = [
    {key: 0, icon:'user', title:'Personal Information', desc:'Please provide for us a few details about yourself.', page:PersonalInfoForm},
    {key: 1, icon:'emergency', title:'Emergency Contact', desc:'Please provide a secondary emergency purposes.', page:EmergencyInfoForm},
    {key: 2, icon:'university', title:'High School Information', desc:'Where do you currently teach?', page:HighSchoolInfoForm},
    {key: 3, icon: 'book', title:'Subjects', desc:'What subjects have you taught in the last 2 years?', page:SubjectForm},
    {key: 3, icon:'help', title:'Confirm', desc:'Is this correct?', page:TeacherConfirmationForm},
    {key: 4, icon:'checked calendar', title:'Submitted', desc:'Your application has been submitted', page:ApplicationSubmittedPage},
];

const TeacherApplication = () => (
    <Application
        header='Teacher Application' 
        data={[
            {
                fname: '',
                lname: '',
                age: '',
                gender: '',
                ethnicity: '',
                citizenship: '',
                email: '',
                phone_no: '',
                street_addr: '',
                city: '',
                state: '',
                zip: '',
            },
            {
                em_fname: '',
                em_lname: '',
                em_phone_no: '',
                em_email: '',
            },
            {
                hs_name: '',
                hs_county: '',
                hs_phone_no: '',
                hs_street_addr: '',
                hs_city: '',
                hs_state: '',
                hs_zip: '',
            },
            {
                subjects: ['',],
            },
        ]}
        forms={forms}
    />
)

export default TeacherApplication;