import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../ApplicationForm.jsx'
import {checkInput, checkPhoneNo} from '../Validation.jsx';

class EmergencyInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

        //this.validate = this.validate.apply.bind(this);
    }

    validate(data) {
        return checkInput(data.em_email, 'email') && 
        checkPhoneNo(data.em_phone_no) && 
        checkInput(data.em_fname, 'name') && 
        checkInput(data.em_lname, 'name');
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
            <Form.Group widths='equal'>
                <Form.Input label='First Name' placeholder='First Name' name='em_fname' value={this.state.em_fname} onChange={this.onChange} />
                <Form.Input label='Last Name' placeholder='Last Name' name='em_lname' value={this.state.em_lname} onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input label='Phone Number' placeholder='Phone Number' name='em_phone_no' value={this.state.em_phone_no} onChange={this.onChange} />
                <Form.Input label='Email' placeholder='Email' name='em_email' value={this.state.em_email} onChange={this.onChange} />
            </Form.Group>
            <Form.Button content='Next' floated='right' />
        </Form>
    )}
}

export default EmergencyInfoForm;