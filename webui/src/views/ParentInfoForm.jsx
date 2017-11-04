import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';

class ParentInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
            <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' name='pg_fname' value={this.state.pg_fname} onChange={this.onChange} />
                <Form.Input label='Last Name' placeholder='Last Name' name='pg_lname' value={this.state.pg_lname} onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='pg_phone_no' value={this.state.pg_phone_no} onChange={this.onChange} />
                <Form.Input label='Email' placeholder='Email' name='pg_email' value={this.state.pg_email} onChange={this.onChange} />
            </Form.Group>
            <Form.Button content='Next' floated='right' />
        </Form>
    )}
}

export default ParentInfoForm;