import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../ApplicationForm.jsx'
import {checkInput, checkPhoneNo} from '../ValidationHelper.jsx';

class EmergencyInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

        //this.validate = this.validate.apply.bind(this);
    }

    validate(data) {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (!checkInput(data.em_email, 'email')) {
            this.state.err.push('em_email');
            pass = false;
        }

        if (!checkPhoneNo(data.em_phone_no)) {
            this.state.err.push('em_phone_no');
            pass = false;
        }

        if (!checkInput(data.em_fname, 'name')) {
            this.state.err.push('em_fname');
            pass = false;
        }

        if (!checkInput(data.em_lname, 'name')) {
            this.state.err.push('em_lname');
            pass = false;
        }

        if (!pass) {
            this.setState(this.state);
        }

        return pass;
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
            <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' name='em_fname' value={this.state.em_fname} onChange={this.onChange} error={this.hasError('em_fname')} />
                <Form.Input label='Last Name' placeholder='Last Name' name='em_lname' value={this.state.em_lname} onChange={this.onChange} error={this.hasError('em_lname')} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='em_phone_no' value={this.state.em_phone_no} onChange={this.onChange} error={this.hasError('em_phone_no')} />
                <Form.Input label='Email' placeholder='Email' name='em_email' value={this.state.em_email} onChange={this.onChange} error={this.hasError('em_email')} />
            </Form.Group>
            <Form.Button content='Next' floated='right' />
        </Form>
    )}
}

export default EmergencyInfoForm;