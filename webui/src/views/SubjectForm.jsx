import React, { Component } from 'react';
import {Form, Button} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx'

class SubjectForm extends ApplicationForm {
    constructor(props) {
        super(props);

    }

    validate() {
        if (this.state.subjects.length === 0) {
            this.state.err.push('subjects');
            return false;
        }

        return true;
    }
    form() {
        return (
            <Form>
                <Form.Input name='subjects' label='Subjects' placeholder='Computer Science, Pre Algebra, Chemistry...' value={this.state.subjects} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('subjects')} />
            </Form>
        )
    }
}

export default SubjectForm;