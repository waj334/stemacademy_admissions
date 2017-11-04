import React, { Component } from 'react';
import Application from '../components/Application.jsx';

import FormStepGroup from '../components/FormStepGroup.jsx';
import PersonalInfoForm from './PersonalInfoForm.jsx';
import ParentInfoForm from './ParentInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import StudentConfirmationForm from './StudentConfirmationForm.jsx';
import ApplicationSubmittedPage from './ApplicationSubmittedPage.jsx';

const forms = [
    {key: 0, icon:'user', title:'Personal Information', desc:'Please provide for us a few details about yourself.', page:PersonalInfoForm},
    {key: 1, icon:'info', title:'Parent/Guardian Contact Information', desc:'Please provide your parent/guardian information.', page:ParentInfoForm},
    {key: 2, icon:'university', title:'High School Information', desc:'Where do you attend school?', page:HighSchoolInfoForm},
    {key: 3, icon:'help', title:'Confirm', desc:'Is this correct?', page:StudentConfirmationForm},
    {key: 4, icon:'checked calendar', title:'Submitted', desc:'Your application has been submitted', page:ApplicationSubmittedPage},
];

var data = [
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
        pg_fname: '',
        pg_lname: '',
        pg_phone_no: '',
        pg_email: '',
    },
    {
        hs_name: '',
        hs_county: '',
        hs_phone_no: '',
        hs_street_addr: '',
        hs_city: '',
        hs_state: '',
        hs_zip: '',
    }
];

const StudentApplication = () => (
    <Application header='Student Application' data={data} forms={forms} />
);

export default StudentApplication;