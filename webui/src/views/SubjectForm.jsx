import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

class SubjectForm extends ApplicationForm {
    constructor(props) {
        super(props);

    }

    form() {
        return (
            <Form>
                <Form.Input name='subjects' label='Subjects' placeholder='Computer Science, Pre Algebra, Chemistry...' value={this.state.subjects} onChange={this.onChange} readOnly={this.props.readOnly} />
            </Form>
        )
    }
}

export default SubjectForm;