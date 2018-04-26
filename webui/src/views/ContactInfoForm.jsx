import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';

import ApplicationForm from '../components/ApplicationForm.jsx';

class ContactInfoForm extends ApplicationForm {
    constructor(props) {
        super(props);

    }

    validate() {
        var pass = true;

        //Discard old error list
        this.state.err = []

        if (this.state.contact_fname.length === 0) {
            this.state.err.push('contact_fname');
            pass = false;
        }

        if (this.state.contact_lname.length === 0) {
            this.state.err.push('contact_lname');
            pass = false;
        }

        if (this.state.contact_phone_no.length === 0) {
            this.state.err.push('contact_phone_no');
            pass = false;
        }

        if (this.state.contact_email.length === 0) {
            this.state.err.push('contact_email');
            pass = false;
        }

        if (!pass) {
            this.setState(this.state);
        }

        return pass;
    }

    form() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='First Name' placeholder='First Name' name='contact_fname' value={this.state.contact_fname} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('contact_fname')} />
                    <Form.Input label='Last Name' placeholder='Last Name' name='contact_lname' value={this.state.contact_lname} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('contact_lname')} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input label='Phone Number' placeholder='Phone Number' name='contact_phone_no' value={this.state.contact_phone_no} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('contact_phone_no')} />
                    <Form.Input label='Email' placeholder='Email' name='contact_email' value={this.state.contact_email} onChange={this.onChange} readOnly={this.props.readOnly} error={this.state.err.includes('contact_email')} />
                </Form.Group>
            </Form>
        )
    }
}

export default ContactInfoForm;