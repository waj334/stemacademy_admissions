import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

import FileListComponent from '../components/FileListComponent.jsx';

export default class DocumentForm extends ApplicationForm {
    form() {
        return (
            <FileListComponent />
        )
    }
}